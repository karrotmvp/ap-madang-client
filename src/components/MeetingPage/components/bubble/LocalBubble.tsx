import React from 'react';

import styled from '@emotion/styled';

import { User } from '../..';

interface Props {
  user: User & { audioStreamValue: boolean };
  volumeState: number;
}

export default function LocalBubble({ user, volumeState }: Props) {
  return (
    <CardWrapper className="vid" volumeState={volumeState}>
      {user.nickname}
      {user ? 'true' : 'false'}
      {user.audioStreamValue ? '말하는 중' : '마이크끔'}
    </CardWrapper>
  );
}

const CardWrapper = styled.div<{ volumeState: number }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: red;
  background: ${({ volumeState }) => (volumeState > 5 ? 'blue' : 'red')};
`;
