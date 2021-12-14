import React, { ReactElement, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useCurrentScreen, useNavigator } from '@karrotframe/navigator';
import { toast } from 'react-toast';

import { deleteMeeting } from '../../../../api/meeting';
import { analytics } from '../../../../App';
import { COLOR } from '../../../../constant/color';

type Prop = {
  id: string;
  setState: React.Dispatch<React.SetStateAction<'menu' | 'delete' | undefined>>;
  setModalCloseState: React.Dispatch<React.SetStateAction<boolean>>;
  onClickOutsideHandler: () => void;
};

function DeleteModalView({
  id,
  setState,
  setModalCloseState,
  onClickOutsideHandler,
}: Prop): ReactElement {
  const { pop, replace } = useNavigator();
  const { isRoot } = useCurrentScreen();

  const onDeleteHandler = useCallback(
    async (e?) => {
      e?.stopPropagation();
      logEvent(analytics, 'delete_meeting__click');
      const urlHashParams = new URLSearchParams(
        window.location.hash.substring(window.location.hash.indexOf('?')),
      );
      setModalCloseState(true);
      setState(undefined);
      const result = await deleteMeeting(id);

      if (result.success) {
        toast('모임을 삭제했어요.', {
          backgroundColor: COLOR.GREY_900,
          color: COLOR.TEXT_WHITE,
        });

        if (isRoot) replace('/');
        else {
          if (urlHashParams.get('created') === 'banner') {
            pop(2);
          } else pop();
        }
        isRoot ? replace('/') : pop();
      } else {
        toast('모임 삭제에 실패했어요.', {
          backgroundColor: COLOR.ORANGE,
          color: COLOR.TEXT_WHITE,
        });
      }
    },
    [id, isRoot, pop, replace, setModalCloseState, setState],
  );

  useEffect(() => {
    logEvent(analytics, 'delete_meeting_modal__show');
  }, []);

  return (
    <DeleteViewStyle>
      <ContentsWrapper>
        <Title>모임을 삭제하시겠어요?</Title>
      </ContentsWrapper>
      <ButtonWrapper>
        <Btn
          className="delete-alarm-modal__close-btn body4"
          onClick={onClickOutsideHandler}
        >
          취소
        </Btn>
        <Btn onClick={onDeleteHandler}>삭제</Btn>
      </ButtonWrapper>
    </DeleteViewStyle>
  );
}

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

export default DeleteModalView;
