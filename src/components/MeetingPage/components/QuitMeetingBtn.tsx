import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import quit from '../../../assets/icon/agora/quit.svg';

interface Props {
  quitHandler: () => void;
}

function QuitMeetingBtn({ quitHandler }: Props): ReactElement {
  return (
    <Button onClick={quitHandler}>
      <Icon src={quit} />
      나가기
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.02rem;
  color: ${({ theme }) => theme.colors.$gray700};

  margin-right: 1.1rem;
`;

const Icon = styled.img`
  margin-right: 0.4rem;
`;

export default QuitMeetingBtn;
