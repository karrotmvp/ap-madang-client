import React, { useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IMicrophoneAudioTrack } from 'agora-rtc-react';
import { logEvent } from 'firebase/analytics';

import { InfoType } from '../../../api/agora';
import { analytics } from '../../../App';
import MicOff from '../../../assets/icon/agora/MicOff';
import micOn from '../../../assets/icon/agora/micOn.svg';
import MannerGuideBtn from './MannerGuideBtn';

const Controls = (props: {
  track: IMicrophoneAudioTrack;
  trackState: { audioStreamValue: boolean };
  setTrackState: React.Dispatch<
    React.SetStateAction<{ audioStreamValue: boolean }>
  >;
  setOpenBottomSheet: React.Dispatch<boolean>;
  info: InfoType;
}) => {
  const { track, trackState, setTrackState, setOpenBottomSheet } = props;

  const [micBtnState, setMicBtnState] = useState(false);
  const theme = useTheme();

  const mute = async (type: 'audio') => {
    if (type === 'audio') {
      logEvent(
        analytics,
        `mic_${trackState.audioStreamValue ? 'off' : 'on'}__click`,
        {
          user_nickname: props.info.user.nickname,
          user_id: props.info.user.id,
          meeting_id: props.info.meeting.id,
          meeting_title: props.info.meeting.title,
        },
      );
      setTrackState(ps => {
        return { audioStreamValue: !ps.audioStreamValue };
      });
      await track.setEnabled(!trackState.audioStreamValue);
    }
  };

  return (
    <Controller>
      <MannerGuideBtn onClickHandler={() => setOpenBottomSheet(true)} />
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
          <Mic_off_Icon color={theme.colors.$button.primary} />
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
  padding: 0 1.6rem;
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

const Mic_off_Icon = styled(MicOff)`
  margin-right: 0.6rem;
  color: blue;
`;

const MicBtn = styled.div<{ btnState: boolean; micOn: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.4rem;

  color: ${({ micOn, theme }) =>
    micOn ? '#FFFFFF' : theme.colors.$button.primary};
  background: ${({ micOn, theme }) =>
    micOn ? theme.colors.$button.primary : 'white'};
  border: ${({ micOn, theme }) =>
    micOn ? 'none' : `1px solid ${theme.colors.$button.primary}`};

  border-radius: 0.4rem;
  font-size: 1.4rem;
  line-height: 2.1rem;
`;

export default Controls;
