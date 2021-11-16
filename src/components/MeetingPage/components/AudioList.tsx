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
import UserAudioCard from './UserAudioCard';

interface Props {
  users: AgoraRTCUsers[];
  localUser: User & { audioStreamValue: boolean };
  volumeState: Map<number, number>;
}
export type OptionType = {
  size: number;
  minSize: number;
  gutter: number;
  showAreaBorder: boolean;
};

const defaultOptions = {
  size: 84,
  minSize: 30,
  gutter: 32,
  showAreaBorder: false,
};

function AudioList({ users, localUser, volumeState }: Props): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState<OptionType>(defaultOptions);

  useEffect(() => {
    setOptions(state => {
      if (rootRef.current) {
        const calcSize = rootRef.current.clientWidth / 3 - state.gutter;
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
    return cDistance - options.size > options.gutter
      ? cDistance - options.size
      : options.gutter;
  }, [cDistance, options.gutter, options.size]);

  const verticalPaddingSize = useMemo(() => {
    const calc =
      Math.sqrt(
        Math.pow(options.gutter + options.size, 2) -
          Math.pow(options.size / 2 + options.gutter / 2, 2),
      ) - options.size;
    return calc < 0 ? 0 : calc;
  }, [options.gutter, options.size]);

  const children = useMemo(
    () =>
      [localUser, ...users].map((user, idx) => {
        return (
          <BubbleWrapper
            idx={idx}
            options={options}
            key={idx}
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
    <AudioListWrapper ref={rootRef}>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </AudioListWrapper>
  );
}

const AudioListWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 10rem;
`;

const ChildrenWrapper = styled.div`
  padding: 80px 0 80px 0;
  /* max-width: 50rem; */
`;

const BubbleWrapper = styled.div<{
  idx: number;
  options: OptionType;
  horizonPaddingSize: number;
  verticalPaddingSize: number;
}>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: ${({ idx, options, horizonPaddingSize }) => {
    if (idx % 5 < 2) return '50%';
    if (idx % 5 === 3) return options.size + horizonPaddingSize + 'px';
    else return `calc(50% - ${(options.size + horizonPaddingSize) / 2}px)`;
  }};
  justify-content: ${({ idx }) => {
    if (idx % 5 === 0 || idx % 5 === 2) return 'flex-end';
    if (idx % 5 === 1 || idx % 5 === 4) return 'flex-start';
    if (idx % 5 === 3) return 'center';
    return 'none';
  }};
  padding: ${({ idx, horizonPaddingSize, verticalPaddingSize }) => {
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
