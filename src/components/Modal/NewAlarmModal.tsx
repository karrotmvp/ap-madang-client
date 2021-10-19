/** @jsx jsx */
import { ReactElement, useEffect } from 'react';

import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import { COLOR } from '../../constant/color';
import { COMMON } from '../../constant/message';
import Modal from './Modal';

interface Props {
  closeHandler: () => void;
}

const InnerModalStyle = css`
  width: 100%;
  height: auto;
  padding: 2rem 0;
`;

const ContentsWrapper = styled.div`
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: center;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
`;

function NewAlarmModal({ closeHandler }: Props): ReactElement {
  useEffect(() => {
    const closeModal = setTimeout(() => {
      closeHandler();
    }, 1000);
    return () => {
      clearTimeout(closeModal);
    };
  }, [closeHandler]);

  return (
    <Modal innerModalStyle={InnerModalStyle}>
      <ContentsWrapper>{COMMON.NEW_ALARM_MODAL.TEXT}</ContentsWrapper>
    </Modal>
  );
}

export default NewAlarmModal;
