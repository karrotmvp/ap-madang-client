import React, { ReactElement, useMemo } from 'react';

import styled from '@emotion/styled';

import happy_scratch from '../../assets/image/happy_scratch.png';
import un_happy_scratch from '../../assets/image/un_happy_scratch.png';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

function QuitMeetingPage(): ReactElement {
  const callState = useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get('callstate') || '';
  }, []);

  const goBackHandler = () => {
    window.open(process.env.KARROT_SCHEME);
    window.close();
  };

  return (
    <PageWrapper>
      <CustomScreenHelmet
        onCustomBackButton={goBackHandler}
        onCustomCloseButton={goBackHandler}
      />
      {callState === 'error' ? (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={un_happy_scratch} />
          <Title>당근마켓 앱을 통해 다시 접속해 주세요.</Title>
          <BackButton onClick={goBackHandler}>당근마켓으로 돌아가기</BackButton>
        </ContentsWrapper>
      ) : callState === 'finish' ? (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={happy_scratch} />
          <Title>{`모임이 종료되었어요.`}</Title>
          <BackButton onClick={goBackHandler}>당근마켓으로 돌아가기</BackButton>
        </ContentsWrapper>
      ) : (
        <ContentsWrapper className="join WaitingRoom">
          <Image src={un_happy_scratch} />
          <Title>모임에서 나갔어요</Title>
          <BackButton onClick={goBackHandler}>당근마켓으로 돌아가기</BackButton>
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

const BackButton = styled.div`
  width: 19.6rem;
  height: 4.6rem;
  background: ${({ theme }) => theme.colors.$button.primary};
  border-radius: 25px;

  font-size: 1.5rem;
  line-height: 2.2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default QuitMeetingPage;
