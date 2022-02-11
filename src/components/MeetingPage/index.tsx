import React, { useCallback, useEffect, useState } from 'react';

import { useNavigator, useQueryParams } from '@karrotframe/navigator';
import { AgoraRTCError, UID } from 'agora-rtc-react';

import { InfoType, validateMeetingCode } from '../../api/agora';
import { auth } from '../../util/firebase';
import MeetingRoom from './MeetingRoom';
import { anonymousLogin } from './util/EmojiFirebase';
import WaitingRoom from './WaitingRoom';

export type AgoraRTCUsers = User & audioStreamState;

export type User = {
  id: UID;
  manner_temperature: number;
  nickname: string;
  profile_image_url: string;
  region_name: string;
};

type audioStreamState = { audioStreamValue: boolean };

export type callState = {
  state: 'waiting' | 'calling' | 'error' | 'finish' | 'quit';
  message?: string;
  error?: AgoraRTCError | string;
};

type leaveMeetingState = 'error' | 'finish' | 'quit';

const AgoraMeetingPage = () => {
  const [inCall, setInCall] = useState<callState>({ state: 'waiting' });
  const [info, setInfo] = useState<InfoType | undefined>(undefined);
  const [meetingCode, setMeetingCode] = useState<string>('');
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const { replace } = useNavigator();

  const querystring: Partial<{ meeting_code: string }> = useQueryParams();

  const leaveHandler = useCallback(
    (state: leaveMeetingState) => {
      replace(`/agora/quit?callstate=${state}`);
    },
    [replace],
  );

  const setCallState = useCallback(
    (callState: callState) => {
      switch (callState.state) {
        case 'calling':
          setInCall(callState);
          break;
        case 'waiting':
          setInCall(callState);
          break;
        default:
          leaveHandler(callState.state);
      }
    },
    [leaveHandler],
  );

  const fetchMeetingData = useCallback(
    async (code: string) => {
      const result = await validateMeetingCode(code);
      if (result.success && result.data) {
        setInfo(result.data);
      } else {
        leaveHandler('error');
      }
    },
    [leaveHandler],
  );

  useEffect(() => {
    if (!info) {
      const code = querystring.meeting_code;
      if (!code) leaveHandler('error');

      code && setMeetingCode(code);
      const sessionInfo = sessionStorage.getItem('info');

      if (sessionInfo && code === JSON.parse(sessionInfo).code) {
        setInfo(JSON.parse(sessionInfo));
      } else if (code) fetchMeetingData(code);
    } else if (info) {
      setCallState({ state: 'calling' });
    }
    return () => {
      sessionStorage.removeItem('Authorization');
    };
  }, [fetchMeetingData, info, leaveHandler, querystring, setCallState]);

  const updateUser = async () => {
    const result = await anonymousLogin(auth);
    setFirebaseUser(result?.user);
  };

  // firebase login
  useEffect(() => {
    console.log('useEffect');
    updateUser();
  }, []);

  useEffect(() => {
    console.log('fa user update ', firebaseUser);
  }, [firebaseUser]);

  return inCall.state === 'calling' && info ? (
    <MeetingRoom setCallState={setCallState} info={info} code={meetingCode} />
  ) : (
    <WaitingRoom callState={inCall} userInfo={info} />
  );
};

export default AgoraMeetingPage;
