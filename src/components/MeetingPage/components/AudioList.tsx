import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';

import { AgoraRTCUsers, User } from '..';
import { uidToNum } from '../../../util/utils';
import MeetingNotice from './MeetingNotice';
import UserAudioCard from './UserAudioCard';

interface Props {
  users: AgoraRTCUsers[];
  localUser: User & { audioStreamValue: boolean };
  volumeState: Map<number, number>;
  subTopic: string[];
}
export type OptionType = {
  size: number;
  minSize: number;
  verticalGutter: number;
  horizonGutter: number;
  showAreaBorder: boolean;
};

const defaultOptions = {
  size: 84,
  minSize: 42,
  verticalGutter: 70,
  horizonGutter: 30,
  showAreaBorder: false,
};

function AudioList({
  users,
  localUser,
  volumeState,
  subTopic,
}: Props): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState<OptionType>(defaultOptions);

  useEffect(() => {
    setOptions(state => {
      if (rootRef.current) {
        const calcSize = rootRef.current.clientWidth / 3 - state.horizonGutter;
        return {
          ...state,
          size: calcSize < state.size ? calcSize : state.size,
        };
      }
      return state;
    });
  }, []);

  //a^2+b^2=c^2
  const cDistance = useMemo(
    () => Math.sqrt(Math.pow(options.size / 2, 2) + Math.pow(options.size, 2)),
    [options.size],
  );

  const horizonPaddingSize = useMemo(() => {
    return cDistance - options.size > options.horizonGutter
      ? cDistance - options.size
      : options.horizonGutter;
  }, [cDistance, options.horizonGutter, options.size]);

  const verticalPaddingSize = useMemo(() => {
    const calc =
      Math.sqrt(
        Math.pow(options.verticalGutter + options.size, 2) -
          Math.pow(options.size / 2 + options.verticalGutter / 2, 2),
      ) - options.size;
    return calc < 0 ? 0 : calc;
  }, [options.verticalGutter, options.size]);

  const children = useMemo(
    () =>
      [localUser, ...users].map((user, idx) => {
        return (
          <BubbleWrapper
            idx={idx}
            userLen={users.length + 1}
            options={options}
            key={user.id}
            horizonPaddingSize={horizonPaddingSize}
            verticalPaddingSize={verticalPaddingSize}
          >
            <UserAudioCard
              options={options}
              user={user}
              rootRef={rootRef}
              volumeState={volumeState?.get(uidToNum(user.id)) || 0}
            />
          </BubbleWrapper>
        );
      }),
    [
      horizonPaddingSize,
      localUser,
      options,
      users,
      verticalPaddingSize,
      volumeState,
    ],
  );

  return (
    <AudioListWrapper ref={rootRef} userNum={users.length}>
      <MeetingNotice subTopic={subTopic} userNum={users.length} />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </AudioListWrapper>
  );
}

const AudioListWrapper = styled.div<{ userNum: number }>`
  flex: 1;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: ${({ userNum }) => (userNum < 5 ? 'center' : 'flex-start')};
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  transition-property: all;
  transition-duration: 1s;
`;

const ChildrenWrapper = styled.div`
  padding: 50px 0 180px 0;
  height: auto;
`;

const BubbleWrapper = styled.div<{
  idx: number;
  userLen: number;
  options: OptionType;
  horizonPaddingSize: number;
  verticalPaddingSize: number;
}>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: ${({ userLen, idx, options, horizonPaddingSize }) => {
    if (
      (userLen - Math.floor(userLen / 5) * 5) % 5 === 1 &&
      idx - Math.floor(userLen / 5) * 5 === 0
    )
      return '100%';
    if (
      (userLen - Math.floor(userLen / 5) * 5) % 5 === 3 &&
      idx - Math.floor(userLen / 5) * 5 === 2
    )
      return '100%';

    if (idx % 5 < 2) return '50%';
    if (idx % 5 === 3) return options.size + horizonPaddingSize + 'px';
    else return `calc(50% - ${(options.size + horizonPaddingSize) / 2}px)`;
  }};
  justify-content: ${({ userLen, idx }) => {
    if (
      (userLen - Math.floor(userLen / 5) * 5) % 5 === 1 &&
      idx - Math.floor(userLen / 5) * 5 === 0
    )
      return 'center';
    if (
      (userLen - Math.floor(userLen / 5) * 5) % 5 === 3 &&
      idx - Math.floor(userLen / 5) * 5 === 2
    )
      return 'center';

    if (idx % 5 === 0 || idx % 5 === 2) return 'flex-end';
    if (idx % 5 === 1 || idx % 5 === 4) return 'flex-start';
    if (idx % 5 === 3) return 'center';
    return 'none';
  }};
  padding: ${({ userLen, idx, horizonPaddingSize, verticalPaddingSize }) => {
    if (
      (userLen - Math.floor(userLen / 5) * 5) % 5 === 1 &&
      idx - Math.floor(userLen / 5) * 5 === 0
    )
      return `${verticalPaddingSize / 2}px 0 ${verticalPaddingSize / 2}px 0`;
    if (
      (userLen - Math.floor(userLen / 5) * 5) % 5 === 3 &&
      idx - Math.floor(userLen / 5) * 5 === 2
    )
      return `${verticalPaddingSize / 2}px 0 ${verticalPaddingSize / 2}px 0`;

    if (idx % 5 === 0 || idx % 5 === 2)
      return `${verticalPaddingSize / 2}px ${horizonPaddingSize / 2}px ${
        verticalPaddingSize / 2
      }px 0`;
    if (idx % 5 === 1 || idx % 5 === 4)
      return `${verticalPaddingSize / 2}px 0 ${verticalPaddingSize / 2}px ${
        horizonPaddingSize / 2
      }px`;
    if (idx % 5 === 3)
      return `${verticalPaddingSize / 2}px ${horizonPaddingSize / 2}px ${
        verticalPaddingSize / 2
      }px ${horizonPaddingSize / 2}px`;
    return 'none';
  }};

  float: left;
`;

export default AudioList;
