import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import Reward, { RewardElement } from 'react-rewards';

import { User } from '..';
import host_icon from '../../../assets/icon/agora/host_icon.svg';
import userMicOff from '../../../assets/icon/agora/user_micOff.svg';
import { COLOR } from '../../../style/color';
import useOnScreenRatio from '../useOnScreenRatio';
import { OptionType } from './AudioList';

interface Props {
  user: User & {
    audioStreamValue: boolean;
    isHost: boolean;
  };
  volumeState: number;
  options: OptionType;
  rootRef: React.RefObject<HTMLDivElement>;
}

const rewardConfig = {
  lifetime: 90,
  angle: 90,
  decay: 0.5,
  spread: 70,
  startVelocity: 44,
  elementCount: 14,
  elemetnSize: 4,
};

export default function UserAudioCard({
  user,
  volumeState,
  options,
  rootRef,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rewardRef = useRef<RewardElement>(null);
  const onScreenRatio = useOnScreenRatio(rootRef, ref);

  useEffect(() => {
    if (rewardRef.current) {
      rewardRef.current.rewardMe();
    }
  }, []);

  return (
    <CardOuterWrapper options={options} ratio={onScreenRatio}>
      <CardInnerWrapper
        options={options}
        profileUrl={user.profile_image_url}
        ref={ref}
        ratio={onScreenRatio}
      >
        <Reward ref={rewardRef} type="confetti" config={rewardConfig}>
          <ProfileImg
            src={user.profile_image_url}
            options={options}
            ratio={onScreenRatio}
            volumeState={volumeState}
          />
        </Reward>
        <InfoArea>
          <NickNameInfo>
            {user.isHost && <HostIcon src={host_icon} />}
            <NickName>{user.nickname}</NickName>
            {!user.audioStreamValue && <MicIcon src={userMicOff} />}
          </NickNameInfo>
          <LocationInfo options={options}>
            {user.region_name || '서초2동'}
          </LocationInfo>
        </InfoArea>
      </CardInnerWrapper>
    </CardOuterWrapper>
  );
}

const CardOuterWrapper = styled.div<{ options: OptionType; ratio: number }>`
  width: ${({ options }) => options.size.toFixed(0) + 'px'};
  height: ${({ options }) => options.size.toFixed(0) + 'px'};

  //TODO: 입체감 요소
  /* height: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'}; */
  transition-property: width, height, background-image;
  transition-duration: 0.3s, 0.3s, 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ options }) =>
    options.showAreaBorder ? '1px solid black' : 'none'};
  box-sizing: border-box;
`;

const CardInnerWrapper = styled.div<{
  options: OptionType;
  ratio: number;
  profileUrl: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: relative;
`;

const ProfileImg = styled.img<{
  options: OptionType;
  ratio: number;
  volumeState: number;
}>`
  transform: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? `scale(${options.minSize / options.size})`
      : `scale(${ratio})`};
  width: ${({ options }) => options.size + 'px'};
  height: ${({ options }) => options.size + 'px'};
  /* height: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'}; */
  border-radius: 50%;

  position: relative;
  z-index: 1;

  border: ${({ volumeState }) =>
    volumeState > 10 ? '2px solid #41ac70;' : 'none'};
  -webkit-box-shadow: ${({ volumeState }) =>
    volumeState > 10 ? '0px 0px 30px #41AC70' : 'none'};
  box-shadow: ${({ volumeState }) =>
    volumeState > 10 ? '0px 0px 30px #41AC70' : 'none'};

  transition-property: width, height, background-size, box-shadow, transform;
  transition-duration: 0.1s, 0.1s, 0.1s, 0.1s, 0.1s;

  box-sizing: border-box;
`;

const InfoArea = styled.div`
  width: 100%;
  position: absolute;
  bottom: calc(1.6rem * 2 * -1 + -6px);
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.3px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NickNameInfo = styled.div`
  width: 100%;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${COLOR.TEXT_BLACK};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const HostIcon = styled.img`
  margin-right: 0.2rem;
`;

const NickName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MicIcon = styled.img``;

const LocationInfo = styled.div<{ options: OptionType }>`
  color: ${COLOR.LIGHT_GREEN};
  width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
