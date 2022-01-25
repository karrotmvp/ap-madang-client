import React, { ReactElement, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from 'karrotframe/lib';
import { useRecoilValue } from 'recoil';

import { getAgoraCode } from '../../api/agora';
import { increaseMeetingEnterUserCount } from '../../api/meeting';
import { analytics } from '../../App';
import orange_house from '../../assets/icon/common/orange_house.svg';
import { userInfoAtom } from '../../store/user';
import { getParams } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

function RedirectPage(): ReactElement {
  const userInfo = useRecoilValue(userInfoAtom);
  const { replace } = useNavigator();
  const goBackHandler = () => {
    window.open(process.env.KARROT_SCHEME);
    window.close();
  };

  // redirect to agora meeting page
  const redirectHandler = useCallback(
    async (code: string, meetingId: string) => {
      const windowReference = window.open(
        `/#/agora?meeting_code=${code}`,
        '_blank',
      );
      await increaseMeetingEnterUserCount(meetingId);
      windowReference;
    },
    [],
  );

  // get agora code
  const fetchAgoraCode = useCallback(async () => {
    const meetingId = getParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'meeting_id',
    );
    console.log('meetingId', meetingId);
    const result = await getAgoraCode(meetingId);
    if (result.success && result.data) {
      redirectHandler(result.data.code, meetingId);
    }
  }, [redirectHandler]);

  useEffect(() => {
    try {
      loginWithMini();
    } catch (e) {
      replace('/agora/quit?callstate=error');
    }
  }, [replace]);

  useEffect(() => {
    if (userInfo) {
      logEvent(analytics, 'meeting_bridge_page__show', {
        userNickname: userInfo?.nickname,
        userRegion: userInfo?.region,
      });
      fetchAgoraCode();
    }
  }, [fetchAgoraCode, userInfo]);

  return (
    <PageWrapper>
      <CustomScreenHelmet
        onCustomBackButton={goBackHandler}
        onCustomCloseButton={goBackHandler}
      />

      <ContentsWrapper className="join WaitingRoom">
        <Image src={orange_house} />
        <Title>모임에 들어가는 중이에요</Title>
        <JoinButton onClick={goBackHandler}>당근마켓으로 돌아가기</JoinButton>
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
  margin-bottom: 2.2rem;
`;

const Title = styled.div`
  font-size: 1.6rem;
  line-height: 2.2rem;

  text-align: center;
  letter-spacing: -0.04rem;

  color: #5c5c5c;
  margin-bottom: 2.4rem;
`;

const JoinButton = styled.div`
  padding: 0.9rem 1.6rem;
  background: ${({ theme }) => theme.colors.$button.primary};
  border-radius: 0.5rem;

  font-size: 1.5rem;
  line-height: 2.2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RedirectPage;
function loginWithMini() {
  throw new Error('Function not implemented.');
}
