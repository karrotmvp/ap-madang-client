/** @jsx jsx */
import React, { ReactElement } from 'react';

import { jsx, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../../constant/color';

interface Props {
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
  className?: string;
  innerModalStyle?: SerializedStyles;
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background: ${COLOR.MODAL_WRAPPER_BLACK};
  box-sizing: border-box;
  border-radius: 0;

  z-index: 1000;
`;

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 219px;
  padding: 2.4rem 2rem;
  margin: 0 4rem;
  background-color: ${COLOR.BACKGROUND_WHITE};
  border-radius: 0.8rem;
  box-sizing: border-box;
`;

function Modal({
  onClose,
  children,
  className,
  innerModalStyle,
}: Props): ReactElement {
  const onCloseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClose && onClose(e);
  };
  return (
    <ModalWrapper
      onClick={onCloseHandler}
      className={classnames('modal', className)}
    >
      <ModalInner onClick={e => e.stopPropagation()} css={innerModalStyle}>
        {children}
      </ModalInner>
    </ModalWrapper>
  );
}

export default Modal;
