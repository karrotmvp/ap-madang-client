/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

interface Props {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  text: string;
  className?: string;
}

type BtnStyleType = {
  disabled?: boolean;
};

const BtnStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0.8rem;
  color: white;
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 2.3rem;
  border-radius: 0.8rem;
  box-sizing: border-box;
  background: ${({ disabled }: BtnStyleType) =>
    disabled ? '#DFE1E3' : '#70BB78'};
`;

function ReservationBtn({
  onClick,
  text,
  disabled,
  className,
}: Props): ReactElement {
  return (
    <BtnStyle className={className} onClick={onClick} disabled={disabled}>
      {text}
    </BtnStyle>
  );
}

export default ReservationBtn;
