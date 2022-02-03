/** @jsx jsx */
import React, { useMemo } from 'react';

import { jsx, keyframes, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { createPortal } from 'react-dom';

import useBlockBack from '../../../hook/useBlockBack';
import { COLOR } from '../../../style/color';

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
  open: boolean;
  onClose?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
  innerModalStyle?: SerializedStyles;
};

export default function Modal({
  open,
  onClose,
  children,
  className,
  innerModalStyle,
}: ModalProps) {
  const onOutsideClick = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.stopPropagation();
    onClose && onClose(e);
  };
  useBlockBack(onOutsideClick);

  return (
    <Portal>
      <ModalOverlay
        onClick={onOutsideClick}
        onDragStart={onOutsideClick}
        className={classnames(
          className,
          open ? 'open-modal-animation' : 'close-modal-animation',
        )}
      >
        <ModalInner
          className={classnames(
            open ? 'open-modal-animation' : 'close-modal-animation',
          )}
          onClick={e => e.stopPropagation()}
          css={innerModalStyle}
        >
          {children}
        </ModalInner>
      </ModalOverlay>
    </Portal>
  );
}

const openModalBackground = keyframes`
  0%{
    opacity:0;
  }
  100% {   
    opacity:100;
  }
`;

const closeModalBackground = keyframes`
  0%{
    opacity:100;
  }
  100% {   
    opacity:0;
  }
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4rem;
  box-sizing: border-box;
  white-space: pre-line;
  background: ${COLOR.MODAL_WRAPPER_BLACK};

  &.open-modal-animation {
    animation: ${openModalBackground} 0.4s ease forwards;
  }
  &.close-modal-animation {
    animation: ${closeModalBackground} 0.4s ease forwards;
  }
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
  z-index: 1000;
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
