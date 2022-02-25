import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';

import { callState } from '.';
import { InfoType } from '../../api/agora';
import { analytics } from '../../App';
import orange_house from '../../assets/icon/common/orange_house.svg';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import PrimaryButton from '../common/PrimaryButton';

function WaitingRoom({
  callState,
  userInfo,
}: {
  callState: callState;
  userInfo: InfoType | undefined;
}): ReactElement {
  const goBackHandler = () => {
    window.open(process.env.KARROT_SCHEME);
    window.close();
  };

  useEffect(() => {
    logEvent(analytics, `meeting_${callState.state}__show`, {
      callState: callState.state,
    });
    if (
      callState.state === 'quit' ||
      callState.state === 'finish' ||
      callState.state === 'error'
    ) {
      sessionStorage.removeItem('info');
      sessionStorage.removeItem('Authorization');
    }
  }, [callState, userInfo]);

  return (
    <PageWrapper>
      <CustomScreenHelmet
        onCustomBackButton={goBackHandler}
        onCustomCloseButton={goBackHandler}
      />
      {callState.state === 'waiting' ? (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={orange_house} />
          <Title>모임에 들어가는 중이에요</Title>
        </ContentsWrapper>
      ) : (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={orange_house} />
          <Title>
            {callState.state === 'error'
              ? `에러가 발생했어요.\n당근마켓 앱을 통해 다시 접속해 주세요.`
              : callState.state === 'finish'
              ? '모임이 종료되었어요.'
              : '모임에서 나갔어요'}
          </Title>
          <Button onClick={goBackHandler}>당근마켓으로 돌아가기</Button>
        </ContentsWrapper>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Image = styled.img`
  height: 7.4rem;
  margin-bottom: 0.8rem;
`;

const Title = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;

  text-align: center;
  letter-spacing: -0.03rem;

  color: #5c5c5c;
  margin-bottom: 3rem;
`;

const Button = styled(PrimaryButton)`
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: white;
  background: ${({ theme }) => theme.colors.$button.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WaitingRoom;
