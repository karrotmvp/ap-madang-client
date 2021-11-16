import React, { useRef } from 'react';

import styled from '@emotion/styled';

import { User } from '..';
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
        volumeState={volumeState}
        options={options}
        profileUrl={user.profile_image_url}
        ref={ref}
        ratio={onScreenRatio}
      >
        <InfoArea>
          <NickNameInfo>{user.nickname}</NickNameInfo>
          <LocationInfo options={options}>서초4동</LocationInfo>
        </InfoArea>
        {/* TODO: 마이크 on/off 처리 */}
        {user.audioStreamValue ? '말하는 중' : '마이크끔'}
      </CardInnerWrapper>
    </CardOuterWrapper>
  );
}

const CardOuterWrapper = styled.div<{ options: OptionType; ratio: number }>`
  width: ${({ options }) => options.size.toFixed(0) + 'px'};
  //TODO: 입체감 요소
  height: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'};
  transition-property: width, height;
  transition-duration: 0.3s, 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ options }) =>
    options.showAreaBorder ? '1px solid black' : 'none'};
`;

const CardInnerWrapper = styled.div<{
  volumeState: number;
  options: OptionType;
  ratio: number;
  profileUrl: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: ${({ profileUrl }) => `url(${profileUrl})`};
  background-size: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'};

  position: relative;
  width: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'};
  height: ${({ options, ratio }) =>
    options.size * ratio < options.minSize
      ? options.minSize.toFixed(0) + 'px'
      : (options.size * ratio).toFixed(0) + 'px'};

  transition-property: width, height;
  transition-duration: 0.3s, 0.3s;

  border-radius: 50%;

  /* background: ${({ volumeState }) =>
    volumeState > 5 ? 'orange' : 'red'}; */
`;

const InfoArea = styled.div`
  width: 100%;
  position: absolute;
  bottom: calc(1.6rem * 2 * -1);
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
`;

const LocationInfo = styled.div<{ options: OptionType }>`
  color: ${COLOR.LIGHT_GREEN};
  width: 100%;
  /* width: ${({ options }) => options.gutter + 'px'}; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
