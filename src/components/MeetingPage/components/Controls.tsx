import React, { useState } from 'react';

import styled from '@emotion/styled';
import { IMicrophoneAudioTrack } from 'agora-rtc-react';

import exit_default from '../../../assets/icon/agora/exit_default.svg';
import exit_pressed from '../../../assets/icon/agora/exit_pressed.svg';
import micOff_default from '../../../assets/icon/agora/micOff_default.svg';
import micOff_pressed from '../../../assets/icon/agora/micOff_pressed.svg';
import micOn_default from '../../../assets/icon/agora/micOn_default.svg';
import micOn_pressed from '../../../assets/icon/agora/micOn_pressed.svg';
import userList_default from '../../../assets/icon/agora/userList_default.svg';
import userList_pressed from '../../../assets/icon/agora/userList_pressed.svg';
import { useClient } from '../MeetingRoom';

const Controls = (props: {
  track: IMicrophoneAudioTrack;
  trackState: { audioStreamValue: boolean };
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setTrackState: React.Dispatch<
    React.SetStateAction<{ audioStreamValue: boolean }>
  >;
}) => {
  const client = useClient();
  const { track, trackState, setStart, setInCall, setTrackState } = props;

  const [leaveBtnState, setLeaveBtnState] = useState(false);
  const [micBtnState, setMicBtnState] = useState(false);
  const [userListBtnState, setUserListBtnState] = useState(false);

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
    setInCall(false);
    window.open('karrot.alpha://minikarrot/');
  };

  return (
    <Controller>
      <LeaveBtn
        onClick={leaveChannel}
        btnState={leaveBtnState}
        onTouchStart={() => setLeaveBtnState(true)}
        onTouchEnd={() => setLeaveBtnState(false)}
      />
      <MicBtn
        onClick={() => mute('audio')}
        btnState={micBtnState}
        micOn={trackState.audioStreamValue}
        onTouchStart={() => setMicBtnState(true)}
        onTouchEnd={() => setMicBtnState(false)}
      />
      <UserListBtn
        btnState={userListBtnState}
        onTouchStart={() => setUserListBtnState(true)}
        onTouchEnd={() => setUserListBtnState(false)}
      />
    </Controller>
  );
};

const Controller = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 6rem);
  padding: 0 3rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;

  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
`;

const LeaveBtn = styled.div<{ btnState: boolean }>`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 50%;
  background-size: 5.2rem 5.2rem;
  background-image: ${({ btnState }) =>
    btnState ? `url(${exit_pressed})` : `url(${exit_default})`};
`;

const MicBtn = styled.div<{ btnState: boolean; micOn: boolean }>`
  width: 6.2rem;
  height: 6.2rem;
  border-radius: 50%;
  background-size: 6.2rem 6.2rem;
  box-shadow: 0 0.2rem 0.88rem rgba(17, 17, 17, 0.1);
  background-image: ${({ btnState, micOn }) => {
    if (micOn) {
      if (btnState) return `url(${micOn_pressed})`;
      return `url(${micOn_default})`;
    }
    if (btnState) return `url(${micOff_pressed})`;
    return `url(${micOff_default})`;
  }};
`;

const UserListBtn = styled.div<{ btnState: boolean }>`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 50%;
  background-size: 5.2rem 5.2rem;
  background-image: ${({ btnState }) =>
    btnState ? `url(${userList_pressed})` : `url(${userList_default})`};
`;

export default Controls;
