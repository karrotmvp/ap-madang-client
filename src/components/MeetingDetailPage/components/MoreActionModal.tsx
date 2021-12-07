import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCurrentScreen, useNavigator } from '@karrotframe/navigator';
import { toast } from 'react-toast';

import { deleteMeeting } from '../../../api/meeting';
import { COLOR } from '../../../constant/color';
import Modal from '../../common/Modal/Modal';

interface Props {
  state: 'menu' | 'delete' | undefined;
  setState: React.Dispatch<React.SetStateAction<'menu' | 'delete' | undefined>>;
  id: string;
}

function MoreActionModal({ state, setState, id }: Props): ReactElement {
  const [modalCloseState, setModalCloseState] = useState(false);
  const { isRoot } = useCurrentScreen();
  const { replace, pop } = useNavigator();

  const closeHandler = useCallback(
    (callback?: () => void): void => {
      setModalCloseState(true);

      setTimeout(() => {
        callback && callback();
        setState(undefined);
      }, 400);
    },
    [setState],
  );

  const onDeleteHandler = useCallback(
    async e => {
      e.stopPropagation();
      const result = await deleteMeeting(id);
      if (result.success) {
        toast('모임을 삭제했어요.', {
          backgroundColor: COLOR.GREY_900,
          color: COLOR.TEXT_WHITE,
        });
        closeHandler(isRoot ? () => replace('/') : () => pop());
      }
    },
    [closeHandler, id, isRoot, pop, replace],
  );

  const MenuView = useMemo(() => {
    return (
      <MenuViewStyle>
        <MenuBtn
          color="#FF5638"
          onClick={() => {
            setState('delete');
          }}
        >
          삭제
        </MenuBtn>
        <MenuBtn color={COLOR.TEXT_BLACK} onClick={() => closeHandler()}>
          닫기
        </MenuBtn>
      </MenuViewStyle>
    );
  }, [closeHandler, setState]);

  const DeleteView = useMemo(() => {
    return (
      <DeleteViewStyle>
        <ContentsWrapper>
          <Title>모임을 삭제하시겠어요?</Title>
        </ContentsWrapper>
        <ButtonWrapper>
          <Btn
            className="delete-alarm-modal__close-btn body4"
            onClick={() => closeHandler()}
          >
            취소
          </Btn>
          <Btn onClick={onDeleteHandler}>삭제</Btn>
        </ButtonWrapper>
      </DeleteViewStyle>
    );
  }, [closeHandler, onDeleteHandler]);

  return state === 'menu' ? (
    <ModalStyle
      open={!modalCloseState}
      innerModalStyle={MenuInnerModal}
      onClose={() => closeHandler()}
    >
      {MenuView}
    </ModalStyle>
  ) : (
    <Modal
      open={!modalCloseState}
      innerModalStyle={DeleteInnerModal}
      onClose={() => closeHandler()}
    >
      {DeleteView}
    </Modal>
  );
}

const ModalStyle = styled(Modal)`
  justify-content: flex-end;
  padding: 0 1.6rem;
`;
const MenuInnerModal = css`
  background: none;
  height: auto;
  padding: 0;
  margin: 0;
  border-radius: 0;
`;
const DeleteInnerModal = css`
  height: auto;
  padding: 0;
`;

const MenuViewStyle = styled.div``;

const MenuBtn = styled.div<{ color: string }>`
  margin-bottom: 1rem;
  background: ${COLOR.TEXT_WHITE};
  border-radius: 0.6rem;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.6rem;
  line-height: 2.3rem;
  text-align: center;
  color: ${({ color }) => color};
`;

const DeleteViewStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentsWrapper = styled.div`
  overflow-y: auto;
  color: ${COLOR.TEXT_BLACK};
  padding: 2.2rem 2rem 2.1rem 2rem;
`;

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.4rem;
  text-align: center;
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
  font-size: 1.5rem;
  line-height: 2.3rem;
`;

export default MoreActionModal;
