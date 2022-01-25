import React, { ReactElement, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from 'karrotframe/lib';
import { useRecoilValue } from 'recoil';

import { getAgoraCode } from '../../api/agora';
import { increaseMeetingEnterUserCount } from '../../api/meeting';
import { analytics } from '../../App';
import orange_house from '../../assets/icon/common/orange_house.svg';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import { getParams } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

function RedirectPage(): ReactElement {
  const userInfo = useRecoilValue(userInfoAtom);
  const { replace } = useNavigator();
  const { loginWithMini } = useMini();
  const goBackHandler = () => {
    window.open(process.env.KARROT_SCHEME);
    window.close();
  };

  const meetingId = useCallback((hash: string) => {
    const result = getParams(hash.substring(hash.indexOf('?')), 'meeting');
    return result.split('&')[0];
  }, []);

  // redirect to agora meeting page
  const redirectHandler = useCallback(
    async (agoraCode: string) => {
      if (!meetingId || !agoraCode) return;
      console.log('agoraCode', agoraCode);
      const windowReference = window.open(
        `/daangn?#/agora?meeting_code=${agoraCode}`,
        '_blank',
      );

      await increaseMeetingEnterUserCount(meetingId(window.location.hash));
      windowReference;
    },
    [meetingId],
  );

  // get agora code
  const fetchAgoraCode = useCallback(async () => {
    const result = await getAgoraCode(meetingId(window.location.hash));
    if (result.success && result.data) {
      setTimeout(() => {
        result.data && redirectHandler(result.data?.code);
      }, 1000);
    }
  }, [meetingId, redirectHandler]);

  useEffect(() => {
    if (!userInfo) {
      try {
        loginWithMini();
      } catch (e) {
        replace('/agora/quit?callstate=error');
      }
    }
  }, [loginWithMini, replace, userInfo]);

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
        <JoinButton onClick={fetchAgoraCode}>직접 입장하기</JoinButton>
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
