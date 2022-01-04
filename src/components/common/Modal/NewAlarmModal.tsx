/** @jsx jsx */
import { ReactElement, useEffect } from 'react';

import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { COMMON } from '../../../constant/message';
import { COLOR } from '../../../style/color';
import Modal from './Modal';

interface Props {
  open: boolean;
  closeHandler: () => void;
  className?: string;
}

function NewAlarmModal({ closeHandler, className, open }: Props): ReactElement {
  useEffect(() => {
    const closeModal = setTimeout(() => {
      closeHandler();
    }, 1200);
    return () => {
      clearTimeout(closeModal);
    };
  }, [closeHandler]);

  return (
    <Modal
      open={open}
      className={classnames('new-alarm-modal', className)}
      innerModalStyle={InnerModalStyle}
    >
      <ContentsWrapper className="new-alarm-modal__contents body3">
        <Title className="body1">{COMMON.NEW_ALARM_MODAL.TITLE}</Title>
        <SubTitle className="body4">{COMMON.NEW_ALARM_MODAL.TEXT}</SubTitle>
      </ContentsWrapper>
    </Modal>
  );
}

const InnerModalStyle = css`
  width: 100%;
  height: auto;
  padding: 2rem 0;
`;

const ContentsWrapper = styled.div`
  text-align: center;
  color: ${COLOR.TEXT_BLACK};
  letter-spacing: -0.03rem;
`;

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: 0.8rem;
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const SubTitle = styled.div`
  color: ${COLOR.TEXT_GREY};
  text-align: center;
  font-size: 1.4rem;
  line-height: 2.1rem;
`;

export default NewAlarmModal;
