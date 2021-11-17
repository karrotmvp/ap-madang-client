import React, { useRef } from 'react';

import styled from '@emotion/styled';

import { User } from '..';
import userMicOff from '../../../assets/icon/agora/user_micOff.svg';
import { COLOR } from '../../../constant/color';
import useOnScreenRatio from '../useOnScreenRatio';
import { OptionType } from './AudioList';

interface Props {
  user: User & {
    audioStreamValue: boolean;
  };
  volumeState: number;
  options: OptionType;
  rootRef: React.RefObject<HTMLDivElement>;
}

export default function UserAudioCard({
  user,
  volumeState,
  options,
  rootRef,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreenRatio = useOnScreenRatio(rootRef, ref);

  return (
    <CardOuterWrapper options={options} ratio={onScreenRatio}>
      <CardInnerWrapper
        options={options}
        profileUrl={user.profile_image_url}
        ref={ref}
        ratio={onScreenRatio}
      >
        <ProfileImg
          src={user.profile_image_url}
          options={options}
          ratio={onScreenRatio}
          volumeState={volumeState}
        />
        <InfoArea>
          <NickNameInfo>
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
  width: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'};
  height: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'};
  border-radius: 50%;

  position: relative;
  z-index: 1;

  border: ${({ volumeState }) =>
    volumeState > 10 ? '2px solid #41ac70;' : 'none'};
  -webkit-box-shadow: ${({ volumeState }) =>
    volumeState > 10 ? '0px 0px 30px #41AC70' : 'none'};
  box-shadow: ${({ volumeState }) =>
    volumeState > 10 ? '0px 0px 30px #41AC70' : 'none'};

  transition-property: width, height, background-size, box-shadow;
  transition-duration: 0.1s, 0.1s, 0.1s, 0.1s;

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
