import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { COLOR } from '../../../../constant/color';
import Modal from '../../../common/Modal/Modal';
import DeleteModalView from './DeleteModalView';

interface Props {
  state: 'menu' | 'delete' | undefined;
  setState: React.Dispatch<React.SetStateAction<'menu' | 'delete' | undefined>>;
  id: string;
}

function MoreActionModal({ state, setState, id }: Props): ReactElement {
  const [modalCloseState, setModalCloseState] = useState(false);
  const closeHandler = useCallback(
    (e?): void => {
      e?.stopPropagation();
      setModalCloseState(true);
      setTimeout(() => {
        setState(undefined);
      }, 400);
    },

    [setState],
  );

  const onClickOutsideHandler = useCallback(
    (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e?.stopPropagation();
      closeHandler();
    },
    [closeHandler],
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
        <MenuBtn color={COLOR.TEXT_BLACK} onClick={onClickOutsideHandler}>
          닫기
        </MenuBtn>
      </MenuViewStyle>
    );
  }, [onClickOutsideHandler, setState]);

  return (
    <ModalStyle
      open={!modalCloseState}
      state={state}
      innerModalStyle={state === 'menu' ? MenuInnerModal : DeleteInnerModal}
      onClose={onClickOutsideHandler}
    >
      {state === 'menu' ? (
        MenuView
      ) : (
        <DeleteModalView
          id={id}
          setModalCloseState={setModalCloseState}
          setState={setState}
          onClickOutsideHandler={onClickOutsideHandler}
        />
      )}
    </ModalStyle>
  );
}

const ModalStyle = styled(Modal)<{
  state: 'menu' | 'delete' | 'goBack' | undefined;
}>`
  justify-content: ${({ state }) => (state === 'menu' ? 'flex-end' : 'center')};
  padding: ${({ state }) => (state === 'menu' ? '0 1.6rem' : '0 4rem')};
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

export default MoreActionModal;
