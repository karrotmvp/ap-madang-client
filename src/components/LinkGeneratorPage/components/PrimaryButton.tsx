import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

type Props = {
  text: string;
  onClick?: () => void;
  className?: string;
};

function PrimaryButton({ text, onClick, className }: Props): ReactElement {
  return (
    <Button className={className} onClick={onClick}>
      <span>{text}</span>
    </Button>
  );
}

const Button = styled.div`
  width: 100%;
  height: 4.8rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.02rem;

  color: #ffffff;

  background: #ff7e36;
  border-radius: 0.6rem;
`;

export default PrimaryButton;
