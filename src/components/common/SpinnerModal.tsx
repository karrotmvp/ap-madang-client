/** @jsx jsx */
import React, { useMemo } from 'react';

import { jsx, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { createPortal } from 'react-dom';

import spinner_icon from '../../assets/icon/common/spinner.svg';
import { COLOR } from '../../constant/color';

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
  show: boolean;
  className?: string;
};

export default function Spinner({ show, className }: ModalProps) {
  return (
    <Portal>
      {show && (
        <SpinnerOverlay
          className={classnames(
            className,
            show ? 'show-spinner-animation' : 'stop-spinner-animation',
          )}
        >
          <SpinnerIcon src={spinner_icon} />
        </SpinnerOverlay>
      )}
    </Portal>
  );
}

const openSpinnerackground = keyframes`
  0%{
    opacity:0;
  }
  100% {   
    opacity:100;
  }
`;

const closeSpinnerBackground = keyframes`
  0%{
    opacity:100;
  }
  100% {   
    opacity:0;
  }
`;

const SpinnerOverlay = styled.div`
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
    animation: ${openSpinnerackground} 0.4s ease forwards;
  }
  &.close-modal-animation {
    animation: ${closeSpinnerBackground} 0.4s ease forwards;
  }
`;

const spinAnimation = keyframes` 
    from {
        transform:rotate(0);
    }
    to {
        transform:rotate(360deg);
    }
`;

const SpinnerIcon = styled.img`
  width: 40px;
  height: 40px;
  animation-name: ${spinAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const rootElement = useMemo(
    () => document.getElementById('spinner-root'),
    [],
  );

  if (!rootElement) {
    throw new Error('없음');
  }

  return createPortal(children, rootElement);
};