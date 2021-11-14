/** @jsx jsx */
import React, { useMemo } from 'react';

import { jsx, keyframes, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import classnamse from 'classnames';
import { createPortal } from 'react-dom';

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
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  open: boolean;
  children: React.ReactNode;
  className?: string;
  innerModalStyle?: SerializedStyles;
};

export default function BottomSheet({
  onClose,
  children,
  open,
  className,
  innerModalStyle,
}: ModalProps) {
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClose && onClose(e);
  };

  return (
    <Portal>
      <BottomSheetOverlay
        onClick={onMaskClick}
        onDragStart={onMaskClick}
        className={classnamse(
          open ? 'close-bottom-sheet' : 'open-bottom-sheet',
          className,
        )}
      >
        <BottomSheetInner
          className={classnamse(
            open ? 'close-bottom-sheet' : 'open-bottom-sheet',
            className,
          )}
          onClick={e => e.stopPropagation()}
          css={innerModalStyle}
        >
          {children}
        </BottomSheetInner>
      </BottomSheetOverlay>
    </Portal>
  );
}

const openSheetBackground = keyframes`
  0%{
    opacity:0;
  }
  100% {   
    opacity:1;
  }
`;

const closeSheetBackground = keyframes`
  0%{
    opacity:1;
  }
  100% {   
    opacity:0;
  }
`;

const openSheet = keyframes`
  0%{
    bottom:-20rem;
  }
  100% {   
    bottom:0;
  }
`;

const closeSheet = keyframes`
  0%{
    bottom:0;
  }
  100% {   
    bottom:-20rem;
  }
`;

const BottomSheetOverlay = styled.div`
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

  &.open-bottom-sheet {
    animation: ${openSheetBackground} 0.5s ease forwards;
  }
  &.close-bottom-sheet {
    animation: ${closeSheetBackground} 0.5s ease forwards;
  }
`;

const BottomSheetInner = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: ${COLOR.TEXT_WHITE};
  border-radius: 1.2rem 1.2rem 0 0;
  display: flex;
  flex-direction: column;

  &.open-bottom-sheet {
    animation: ${openSheet} 0.5s ease forwards;
  }
  &.close-bottom-sheet {
    animation: ${closeSheet} 0.5s ease forwards;
  }
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
