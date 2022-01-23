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
  align-items: center;
`;

const Icon = styled.img`
  margin-right: 0.4rem;
`;

const TextWrapper = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;

  color: #4d5159;
  letter-spacing: -0.02rem;
`;

export default MannerGuideBtn;
