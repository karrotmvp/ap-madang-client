import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import guide from '../../../assets/icon/agora/guide.svg';

interface Props {
  onClickHandler: () => void;
}

function MannerGuideBtn({ onClickHandler }: Props): ReactElement {
  return (
    <ButtonWrapper onClick={onClickHandler}>
      <Icon src={guide} />
      <TextWrapper>문화가이드</TextWrapper>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-right: 2rem;
`;

const Icon = styled.img`
  margin-right: 0.6rem;
`;

const TextWrapper = styled.div`
  font-size: 1.4rem;
  line-height: 1.7rem;

  color: #29a35f;
`;

export default MannerGuideBtn;
