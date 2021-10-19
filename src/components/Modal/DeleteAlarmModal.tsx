import { ReactElement, useCallback, useEffect, useState } from 'react';
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { COLOR } from '../../constant/color';
import { COMMON } from '../../constant/message';
import Modal from './Modal';

interface Props {
  closeHandler: () => void;
  deleteAlarmHandler: () => Promise<boolean>;
}

const InnerModalStyle = css`
  margin: 0 4rem;
  height: auto;
  padding: 0;
`;

const ContentsWrapper = styled.div`
  overflow-y: auto;
  color: ${COLOR.TEXT_GRAY};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.03rem;
  line-height: 2.4rem;
  padding: 2rem;
`;

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03rem;
  margin-bottom: 1.2rem;
`;

const SubTitle = styled.span`
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 2.1rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_GRAY};
`;

const DoneTitle = styled.div`
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: center;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  width: 100%;
  height: 4.3rem;

  border-top: 0.1rem solid rgba(0, 0, 0, 0.07);
  div:first-of-type {
    border-right: 0.1rem solid rgba(0, 0, 0, 0.07);
  }
`;

const Btn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 1.5rem;
  line-height: 1.8rem;
  letter-spacing: -0.02rem;
  color: ${COLOR.LIGHT_GREEN};
`;

const CloseBtn = styled(Btn)`
  font-weight: 500;
`;

function DeleteAlarmModal({
  closeHandler,
  deleteAlarmHandler,
}: Props): ReactElement {
  const [deleted, setDeleted] = useState(false);

  const deleteBtnHandler = useCallback(async () => {
    const result = await deleteAlarmHandler();
    if (result) {
      setDeleted(true);
    }
  }, [deleteAlarmHandler]);

  useEffect(() => {
    if (deleted) {
      const timeout = setTimeout(() => {
        closeHandler();
      }, 800);
      return () => {
        clearTimeout(timeout);
      };
    }
    return;
  }, [closeHandler, deleted]);

  const onClickOutsideHandler: React.MouseEventHandler<HTMLDivElement> =
    event => {
      event.stopPropagation();
      closeHandler();
    };

  return deleted ? (
    <Modal innerModalStyle={InnerModalStyle}>
      <ContentsWrapper>
        <DoneTitle>{COMMON.DELETE_ALARM_MODAL.DONE_DELETE}</DoneTitle>
      </ContentsWrapper>
    </Modal>
  ) : (
    <Modal onClose={onClickOutsideHandler} innerModalStyle={InnerModalStyle}>
      <ContentsWrapper>
        <Title>{COMMON.DELETE_ALARM_MODAL.TITLE}</Title>
        <SubTitle>{COMMON.DELETE_ALARM_MODAL.SUB_TITLE}</SubTitle>
      </ContentsWrapper>
      <ButtonWrapper>
        <CloseBtn onClick={closeHandler}>
          {COMMON.DELETE_ALARM_MODAL.CLOSE}
        </CloseBtn>
        <Btn onClick={deleteBtnHandler}>{COMMON.DELETE_ALARM_MODAL.DELETE}</Btn>
      </ButtonWrapper>
    </Modal>
  );
}

export default DeleteAlarmModal;
