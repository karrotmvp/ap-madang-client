/** @jsx jsx */
import React, { ReactElement } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../constant/color';

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
  height: 56px;
  padding: 0.8rem;
  color: ${COLOR.TEXT_WHITE};
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 2.3rem;
  border-radius: 0.8rem;
  box-sizing: border-box;
  background: ${({ disabled }: BtnStyleType) =>
    disabled ? COLOR.DISABLE_BTN : COLOR.LIGHT_GREEN};
`;

function ReservationBtn({
  className,
  onClick,
  disabled,
  text,
}: Props): ReactElement {
  return (
    <BtnStyle
      className={classnames('reservation-btn', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </BtnStyle>
  );
}

export default ReservationBtn;
