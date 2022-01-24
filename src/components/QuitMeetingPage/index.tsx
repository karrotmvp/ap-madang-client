import React, { ReactElement, useMemo } from 'react';

import styled from '@emotion/styled';

import orange_house from '../../assets/icon/common/orange_house.svg';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import PrimaryButton from '../common/PrimaryButton';

function QuitMeetingPage(): ReactElement {
  const callState = useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
    );
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
      <ContentsWrapper className="join WaitingRoom">
        <Image src={orange_house} />
        <Title>
          {callState === 'error'
            ? `에러가 발생했어요.\n당근마켓 앱을 통해 다시 접속해 주세요.`
            : callState === 'finish'
            ? '모임이 종료되었어요.'
            : '모임에서 나갔어요'}
        </Title>
        <Button onClick={goBackHandler}>당근마켓으로 돌아가기</Button>
      </ContentsWrapper>
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
  margin-bottom: 2.4rem;
`;

const Button = styled(PrimaryButton)`
  width: auto;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: white;
  background: ${({ theme }) => theme.colors.$button.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default QuitMeetingPage;
