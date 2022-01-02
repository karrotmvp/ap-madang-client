import React, { useEffect, useState } from 'react';

import { useQueryParams } from '@karrotframe/navigator';
import { AgoraRTCError, UID } from 'agora-rtc-react';

import { InfoType, validateMeetingCode } from '../../api/agora';
import RedirectPage from '../RedirectPage';
import MeetingRoom from './MeetingRoom';
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
  state: 'waiting' | 'calling' | 'quit' | 'error' | 'finish';
  message?: string;
  error?: AgoraRTCError | string;
};

const AgoraMeetingPage = () => {
  const [inCall, setInCall] = useState<callState>({ state: 'waiting' });
  const [info, setInfo] = useState<InfoType | undefined>(undefined);
  const [meetingCode, setMeetingCode] = useState<string>('');

  const querystring: Partial<{ meeting_code: string }> = useQueryParams();

  const fetchMeetingData = async (code: string) => {
    const result = await validateMeetingCode(code);
    if (result.success && result.data) {
      setInfo(result.data);
    } else {
      setInCall({ state: 'error', message: ' ' });
    }
  };

  useEffect(() => {
    if (!info) {
      const code = querystring.meeting_code;
      if (!code)
        setInCall({ state: 'error', message: '올바르지 않은 접근이에요' });
      code && setMeetingCode(code);
      const sessionInfo = sessionStorage.getItem('info');

      if (sessionInfo && code === JSON.parse(sessionInfo).code) {
        setInfo(JSON.parse(sessionInfo));
      } else if (code) fetchMeetingData(code);
    } else if (info) {
      setInCall({ state: 'calling' });
    }
    return () => {
      sessionStorage.removeItem('Authorization');
    };
  }, [info, querystring]);

  return inCall.state === 'calling' && info ? (
    <MeetingRoom setInCall={setInCall} info={info} code={meetingCode} />
  ) : inCall.state === 'waiting' ? (
    <RedirectPage />
  ) : (
    <WaitingRoom callState={inCall} userInfo={info} />
  );
};

export default AgoraMeetingPage;
