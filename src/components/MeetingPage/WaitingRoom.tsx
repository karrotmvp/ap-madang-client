import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';

import { callState } from '.';
import { InfoType } from '../../api/agora';
import { analytics } from '../../App';
import happy_scratch from '../../assets/image/happy_scratch.png';
import nav_logo from '../../assets/image/nav_logo.png';
import un_happy_scratch from '../../assets/image/un_happy_scratch.png';
import { COLOR } from '../../constant/color';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

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
        appendMiddle={<PageTitle src={nav_logo} />}
      />
      {callState.state === 'error' ? (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={un_happy_scratch} />
          <Title>
            {`${
              callState.message
                ? callState.message
                : '올바르지 않은 접근이에요.'
            }\n당근마켓 앱을 통해 다시 접속해 주세요.`}
          </Title>
          <GreenBtn onClick={goBackHandler}>당근마켓 앱으로 돌아가기</GreenBtn>
        </ContentsWrapper>
      ) : callState.state === 'finish' ? (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={happy_scratch} />
          <Title>{`모임이 종료되었어요.`}</Title>
          <GreenBtn onClick={goBackHandler}>랜선동네모임으로 돌아가기</GreenBtn>
        </ContentsWrapper>
      ) : (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={un_happy_scratch} />
          <Title>
            {`모임에서 나갔어요.\n랜선동네모임에서 다른 모임도 구경해 보세요.`}
          </Title>
          <GreenBtn onClick={goBackHandler}>랜선동네모임으로 돌아가기</GreenBtn>
        </ContentsWrapper>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PageTitle = styled.img`
  height: 1.43rem;
  width: auto;
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
  margin-bottom: 1.2rem;
`;

const Title = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;

  text-align: center;
  letter-spacing: -0.03rem;

  color: #5c5c5c;
  margin-bottom: 3rem;
`;

const GreenBtn = styled.div`
  width: 19.6rem;
  height: 4.6rem;
  background: ${COLOR.LIGHT_GREEN};
  border-radius: 25px;

  font-size: 1.5rem;
  line-height: 2.2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WaitingRoom;
