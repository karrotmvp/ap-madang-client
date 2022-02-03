import React, { useCallback, useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import {
  createClient,
  ClientConfig,
  createMicrophoneAudioTrack,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-react';

import { AgoraRTCUsers, callState } from '.';
import { InfoType } from '../../api/agora';
import { getMeetingUsersInfo } from '../../api/user';
import { analytics } from '../../App';
import AGORA_ERROR_MSG from '../../constant/agoraErrMsg';
import { noSleep } from '../../util/nosleep';
import { uidToNum } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import AudioList from './components/AudioList';
import Controls from './components/Controls';
import GuideBottomSheet from './components/GuideBottomSheet/GuideBottomSheet';
import MeetingTitle from './components/MeetingTitle';
import QuitMeetingBtn from './components/QuitMeetingBtn';

const agoraConfig: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};
export const useClient = createClient(agoraConfig);

const useMicrophoneAudioTrack = createMicrophoneAudioTrack();

const MeetingRoom = ({
  setCallState,
  info,
  code,
}: {
  setCallState: (callState: callState) => void;
  info: InfoType;
  code: string;
}) => {
  const [users, setUsers] = useState<(AgoraRTCUsers & { isHost: boolean })[]>(
    [],
  );
  const [start, setStart] = useState<boolean>(false);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const [trackState, setTrackState] = useState({ audioStreamValue: true });
  const [volumeState, setVolumeState] = useState<Map<number, number>>(
    new Map(),
  );
  const { ready, track, error } = useMicrophoneAudioTrack();
  const client = useClient();

  const userNum = useMemo(() => users.length, [users.length]);

  const fetchNewUser = useCallback(
    async (user: IAgoraRTCRemoteUser) => {
      const fetchUserInfo = await getMeetingUsersInfo(uidToNum(user.uid));
      if (fetchUserInfo.success && fetchUserInfo.data) {
        setUsers(prevUsers =>
          fetchUserInfo.data
            ? [
                ...prevUsers,
                {
                  ...user,
                  ...fetchUserInfo.data,
                  audioStreamValue: true,
                  isHost: info.meeting.host.id === fetchUserInfo.data.id,
                },
              ]
            : prevUsers,
        );
      }
    },
    [info.meeting.host.id],
  );

  const init = useCallback(async () => {
    // 신규 유저 유입
    client.on('user-joined', async user => {
      fetchNewUser(user);
    });

    // 유저 마이크 on
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'audio') {
        user.audioTrack?.play();
        setUsers(prevUsers => {
          return prevUsers.map(User => {
            if (User.id == user.uid)
              return { ...User, ...user, audioStreamValue: true };
            return User;
          });
        });
      }
    });

    // 유저 마이크 off
    client.on('user-unpublished', (user, type) => {
      if (type === 'audio') {
        user.audioTrack?.stop();
        setUsers(prevUsers =>
          prevUsers.map(User => {
            if (User.id == user.uid)
              return { ...User, ...user, audioStreamValue: false };
            return User;
          }),
        );
      }
    });

    //유저 탈퇴
    client.on('user-left', user => {
      setUsers(prevUsers => prevUsers.filter(User => User.id != user.uid));
    });

    //유저 sound 크기
    client.enableAudioVolumeIndicator();
    client.on('volume-indicator', volumes => {
      setVolumeState(
        new Map(volumes.map(el => [uidToNum(el.uid), Math.floor(el.level)])),
      );
    });

    //token expired
    client.on('token-privilege-did-expire', async () => {
      setCallState({ state: 'finish' });
    });

    // 로컬 유저 가입
    try {
      await client.join(
        process.env.AGORA_APP_ID || '',
        info.meeting.channel_name,
        info.agora_token,
        info.user.id,
      );
      logEvent(analytics, 'meeting_calling__show', {
        ...info.user,
        ...info.meeting,
      });
    } catch (e) {
      setCallState({
        state: 'error',
        error: e as string,
      });
    }

    if (track) await client.publish(track);
    setStart(true);
  }, [
    client,
    fetchNewUser,
    info.agora_token,
    info.meeting,
    info.user,
    setCallState,
    track,
  ]);

  const leaveChannel = async () => {
    logEvent(analytics, `quit_meeting__click`, {
      meeting_user_num: userNum,
      user_nickname: info.user.nickname,
      user_id: info.user.id,
      meeting_id: info.meeting.id,
      meeting_title: info.meeting.title,
      is_host: info.meeting.host.id === info.user.id,
    });
    await client.leave();
    client.removeAllListeners();
    track?.close();
    setStart(false);
    setCallState({ state: 'quit' });
  };

  useEffect(() => {
    if (error) {
      setCallState({
        state: 'error',
        message: AGORA_ERROR_MSG[error.code],
        error: error,
      });
    }
    if (ready && track && info) {
      sessionStorage.setItem('info', JSON.stringify({ code, ...info }));
      sessionStorage.setItem('Authorization', info.token);
      init();
    }
    return () => {
      sessionStorage.removeItem('info');
      sessionStorage.removeItem('Authorization');
    };
  }, [code, error, info, init, ready, setCallState, track]);

  useEffect(() => {
    if (!noSleep.isEnabled) noSleep.enable();
    return () => noSleep.disable();
  }, []);

  return (
    <MeetingRoomWrapper className="meeting-room">
      <CustomScreenHelmet
        customCloseButton={<div />}
        customBackButton={<div />}
        appendRight={<QuitMeetingBtn quitHandler={leaveChannel} />}
      />
      {openBottomSheet && (
        <GuideBottomSheet onClose={() => setOpenBottomSheet(false)} />
      )}
      <MeetingTitle title={info.meeting.title} />
      {start && track && info && (
        <AudioList
          users={users}
          subTopic={info.meeting.sub_topics}
          localUser={{
            ...info.user,
            audioStreamValue: trackState.audioStreamValue,
            isHost: info.user.id === info.meeting.host.id,
          }}
          volumeState={volumeState}
        />
      )}

      {ready && track && (
        <Controls
          track={track}
          trackState={trackState}
          setTrackState={setTrackState}
          setOpenBottomSheet={setOpenBottomSheet}
          info={info}
        />
      )}
    </MeetingRoomWrapper>
  );
};

const MeetingRoomWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export default MeetingRoom;
