import React from 'react';

import valid_error_icon from '@assets/icon/CreatePage/valid_error_icon.svg';
import Spacing from '@components/Home/components/Spacing';
import styled from '@emotion/styled';

type Props = { message: string };

function ValidError({ message }: Props) {
  return (
    <ValidationInfo>
      <img src={valid_error_icon} />
      <Spacing width="0.4rem" />
      <Message role="alert">{message}</Message>
    </ValidationInfo>
  );
}

const ValidationInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Message = styled.span`
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.03rem;
  color: #e81300;
`;

export default ValidError;
