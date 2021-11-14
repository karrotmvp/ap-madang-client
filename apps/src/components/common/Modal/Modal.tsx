/** @jsx jsx */
import React, { useMemo } from 'react';

import { jsx, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { createPortal } from 'react-dom';

import { COLOR } from '../../../constant/color';

export type Confirm = {
  text: React.ReactNode;
  no: React.ReactNode;
  yes: React.ReactNode;
};

export type Content = {
  text: React.ReactNode;
  confirm?: Confirm;
};

export type ModalInfoType = {
  list?: Content[];
  confirm?: Confirm;
};

export type innerModeType = 'list' | 'confirm';

type ModalProps = {
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
  className?: string;
  innerModalStyle?: SerializedStyles;
};

export default function Modal({
  onClose,
  children,
  className,
  innerModalStyle,
}: ModalProps) {
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClose && onClose(e);
  };

  return (
    <Portal>
      <ModalOverlay
        onClick={onMaskClick}
        onDragStart={onMaskClick}
        className={classnames('modal', className)}
      >
        <ModalInner onClick={e => e.stopPropagation()} css={innerModalStyle}>
          {children}
        </ModalInner>
      </ModalOverlay>
    </Portal>
  );
}

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${COLOR.MODAL_WRAPPER_BLACK};
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4rem;
  box-sizing: border-box;
  white-space: pre-line;
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

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const rootElement = useMemo(() => document.getElementById('modal-root'), []);

  if (!rootElement) {
    throw new Error('없음');
  }

  return createPortal(children, rootElement);
};
