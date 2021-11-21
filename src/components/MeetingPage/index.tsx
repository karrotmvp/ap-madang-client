import React, { useEffect, useState } from 'react';

import { UID } from 'agora-rtc-react';

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
};

const AgoraMeetingPage = () => {
  const [inCall, setInCall] = useState<callState>({ state: 'waiting' });
  const [info, setInfo] = useState<InfoType | undefined>(undefined);

  const fetchMeetingData = async (code: string) => {
    const result = await validateMeetingCode(code);
    if (result.success && result.data) {
      setInfo(result.data);
    }
  };

  useEffect(() => {
    if (!info) {
      const urlHashParams = new URLSearchParams(
        window.location.hash.substr(window.location.hash.indexOf('?')),
      );
      const code = urlHashParams.get('meeting_code');
      if (code) fetchMeetingData(code);
    } else if (info) {
      setInCall({ state: 'calling' });
    }
    return () => {
      sessionStorage.removeItem('Authorization');
    };
  }, [info]);

  return inCall.state === 'calling' && info ? (
    <MeetingRoom setInCall={setInCall} info={info} />
  ) : inCall.state === 'waiting' ? (
    <RedirectPage />
  ) : (
    <WaitingRoom callState={inCall} />
  );
};

export default AgoraMeetingPage;
