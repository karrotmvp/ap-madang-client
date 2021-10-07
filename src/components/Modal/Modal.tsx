/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { COLOR } from '../../constant/color';

function Modal({ onClose, children }: Props): ReactElement {
  return (
    <ModalWrapper onClick={onClose}>
      <ModalInner onClick={e => e.stopPropagation()}>{children}</ModalInner>
    </ModalWrapper>
  );
}

export default Modal;

interface Props {
  onClose: () => void;
  children: React.ReactNode;
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
