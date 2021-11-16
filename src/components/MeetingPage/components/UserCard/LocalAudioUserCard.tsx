import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { User } from '../..';

interface Props {
  user: User & { audio: boolean };
  volumeState: number;
}

function LocalAudioUserCard({ user, volumeState }: Props): ReactElement {
  console.log('local  volumeStatevolumeState', volumeState);
  return (
    <CardWrapper className="vid" volumeState={volumeState}>
      {user.nickname}
      {user ? 'true' : 'false'}
      {user.audio ? '말하는 중' : '마이크끔'}
    </CardWrapper>
  );
}

const CardWrapper = styled.div<{ volumeState: number }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: blue;
  border: 10px solid black;
  background: ${({ volumeState }) => (volumeState > 5 ? 'black' : 'orange')};
`;

export default LocalAudioUserCard;
