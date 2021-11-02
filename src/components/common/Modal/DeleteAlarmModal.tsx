import { ReactElement, useCallback, useEffect, useState } from 'react';
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../../constant/color';
import { COMMON } from '../../../constant/message';
import Modal from './Modal';

interface Props {
  closeHandler: () => void;
  deleteAlarmHandler: () => Promise<boolean>;
  className?: string;
}

const InnerModalStyle = css`
  margin: 0 4rem;
  height: auto;
  padding: 0;
  letter-spacing: -0.03rem;
`;

const ContentsWrapper = styled.div`
  overflow-y: auto;
  color: ${COLOR.TEXT_GRAY};
  padding: 2.2rem 2rem 2rem 2rem;
`;

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: 1.2rem;
  text-align: center;
`;

const SubTitle = styled.div`
  color: ${COLOR.TEXT_GRAY};
  text-align: center;
`;

const DoneTitle = styled.div`
  text-align: center;
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
  color: ${COLOR.LIGHT_GREEN};
`;

const CloseBtn = styled(Btn)`
  font-weight: 500;
`;

function DeleteAlarmModal({
  closeHandler,
  deleteAlarmHandler,
  className,
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
      !deleted && closeHandler();
    };

  return (
    <Modal
      className={classnames('delete-alarm-modal', className)}
      onClose={onClickOutsideHandler}
      innerModalStyle={InnerModalStyle}
    >
      {deleted ? (
        <ContentsWrapper>
          <DoneTitle className="delete-alarm-modal__title body3">
            {COMMON.DELETE_ALARM_MODAL.DONE_DELETE}
          </DoneTitle>
        </ContentsWrapper>
      ) : (
        <>
          <ContentsWrapper className="delete-alarm-modal__contents">
            <Title className="body1">{COMMON.DELETE_ALARM_MODAL.TITLE}</Title>
            <SubTitle className="body4">
              {COMMON.DELETE_ALARM_MODAL.SUB_TITLE}
            </SubTitle>
          </ContentsWrapper>
          <ButtonWrapper>
            <CloseBtn
              className="delete-alarm-modal__close-btn body4"
              onClick={closeHandler}
            >
              {COMMON.DELETE_ALARM_MODAL.CLOSE}
            </CloseBtn>
            <Btn
              className="delete-alarm-modal__delete-btn body4"
              onClick={deleteBtnHandler}
            >
              {COMMON.DELETE_ALARM_MODAL.DELETE}
            </Btn>
          </ButtonWrapper>
        </>
      )}
    </Modal>
  );
}

export default DeleteAlarmModal;
