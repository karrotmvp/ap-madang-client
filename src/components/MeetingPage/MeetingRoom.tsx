import React, { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  createClient,
  ClientConfig,
  createMicrophoneAudioTrack,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-react';

import { AgoraRTCUsers, callState } from '.';
import { InfoType } from '../../api/agora';
import { getMeetingUsersInfo } from '../../api/user';
import { uidToNum } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import AudioList from './components/AudioList';
import Controls from './components/Controls';
import GuideBottomSheet from './components/GuideBottomSheet/GuideBottomSheet';
import MannerGuideBtn from './components/MannerGuideBtn';
import MeetingTitle from './components/MeetingTitle';

const agoraConfig: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};
export const useClient = createClient(agoraConfig);

const useMicrophoneAudioTrack = createMicrophoneAudioTrack();

const MeetingRoom = ({
  setInCall,
  info,
}: {
  setInCall: React.Dispatch<React.SetStateAction<callState>>;
  info: InfoType;
}) => {
  const [users, setUsers] = useState<AgoraRTCUsers[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const [trackState, setTrackState] = useState({ audioStreamValue: true });
  const [volumeState, setVolumeState] = useState<Map<number, number>>(
    new Map(),
  );
  const { ready, track, error } = useMicrophoneAudioTrack();
  const client = useClient();

  const fetchNewUser = useCallback(async (user: IAgoraRTCRemoteUser) => {
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
              },
            ]
          : prevUsers,
      );
    }
  }, []);

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
      setInCall('finish');
    });

    // 로컬 유저 가입
    try {
      await client.join(
        process.env.AGORA_APP_ID || '',
        info.meeting.channel_name,
        info.agora_token,
        info.user.id,
      );
    } catch (e) {
      setInCall('error');
    }

    if (track) await client.publish(track);
    setStart(true);
  }, [
    client,
    fetchNewUser,
    info.agora_token,
    info.meeting.channel_name,
    info.user.id,
    setInCall,
    track,
  ]);

  useEffect(() => {
    if (error) {
      setInCall('error');
    }
    if (ready && track && info) {
      sessionStorage.setItem('Authorization', info.token);
      init();
    }
    return () => {
      sessionStorage.removeItem('Authorization');
    };
  }, [error, info, init, ready, setInCall, track]);

  return (
    <MeetingRoomWrapper className="meeting-room">
      <CustomScreenHelmet
        customCloseButton={<div />}
        customBackButton={<div />}
        appendRight={
          <MannerGuideBtn onClickHandler={() => setOpenBottomSheet(true)} />
        }
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
          }}
          volumeState={volumeState}
        />
      )}

      {ready && track && (
        <Controls
          track={track}
          setStart={setStart}
          setInCall={setInCall}
          trackState={trackState}
          setTrackState={setTrackState}
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
