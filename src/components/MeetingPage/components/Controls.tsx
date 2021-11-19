import React, { useState } from 'react';

import styled from '@emotion/styled';
import { IMicrophoneAudioTrack } from 'agora-rtc-react';

import { callState } from '..';
import micOff from '../../../assets/icon/agora/micOff.svg';
import micOn from '../../../assets/icon/agora/micOn.svg';
import { COLOR } from '../../../constant/color';
import { useClient } from '../MeetingRoom';

const Controls = (props: {
  track: IMicrophoneAudioTrack;
  trackState: { audioStreamValue: boolean };
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<callState>>;
  setTrackState: React.Dispatch<
    React.SetStateAction<{ audioStreamValue: boolean }>
  >;
}) => {
  const client = useClient();
  const { track, trackState, setStart, setInCall, setTrackState } = props;

  const [leaveBtnState, setLeaveBtnState] = useState(false);
  const [micBtnState, setMicBtnState] = useState(false);

  const mute = async (type: 'audio') => {
    if (type === 'audio') {
      await track.setEnabled(!trackState.audioStreamValue);
      setTrackState(ps => {
        return { audioStreamValue: !ps.audioStreamValue };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    track.close();
    setStart(false);
    setInCall({ state: 'quit' });
  };

  return (
    <Controller>
      <LeaveBtn
        btnState={leaveBtnState}
        onClick={leaveChannel}
        onTouchStart={() => setLeaveBtnState(true)}
        onTouchEnd={() => setLeaveBtnState(false)}
      >
        나가기
      </LeaveBtn>
      <MicBtn
        onClick={() => mute('audio')}
        btnState={micBtnState}
        micOn={trackState.audioStreamValue}
        onTouchStart={() => setMicBtnState(true)}
        onTouchEnd={() => setMicBtnState(false)}
      >
        {trackState.audioStreamValue ? (
          <Icon src={micOn} />
        ) : (
          <Icon src={micOff} />
        )}
        {trackState.audioStreamValue
          ? '마이크가 켜져 있어요'
          : '마이크가 꺼져 있어요'}
      </MicBtn>
    </Controller>
  );
};

const Controller = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 4rem);
  padding: 0 2rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;

  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  font-size: 1.4rem;
`;

const Icon = styled.img`
  margin-right: 0.6rem;
`;

const LeaveBtn = styled.div<{ btnState: boolean }>`
  width: 8.4rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ btnState }) =>
    btnState ? COLOR.TEXT_WHITE : COLOR.TEXT_WHITE};
  box-shadow: 0 2px 9px rgba(17, 17, 17, 0.1),
    0px 1px 5px rgba(17, 17, 17, 0.02);
  border-radius: 10rem;

  color: #f65b55;

  line-height: 1.7rem;
`;

const MicBtn = styled.div<{ btnState: boolean; micOn: boolean }>`
  width: 17.5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ micOn }) => (micOn ? '#2EB86A' : '#F5F5F5')};
  box-shadow: ${({ micOn }) =>
    micOn
      ? '0px 2px 9px rgba(17, 17, 17, 0.22), 0px 1px 5px rgba(17, 17, 17, 0.06)'
      : '0px 2px 9px rgba(17, 17, 17, 0.11), 0px 1px 5px rgba(17, 17, 17, 0.05)'};
  border-radius: 10rem;
  color: ${({ micOn }) => (micOn ? '#FFFFFF' : '#5F6263')};
  line-height: 2.2rem;
`;

export default Controls;
