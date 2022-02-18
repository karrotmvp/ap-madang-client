import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from 'karrotframe/lib';
import { useRecoilValue } from 'recoil';

import { getAgoraCode } from '../../api/agora';
import { analytics } from '../../App';
import orange_house from '../../assets/icon/common/orange_house.svg';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import mini from '../../util/mini';
import { checkMobileType, getQueryString } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

function RedirectPage(): ReactElement {
  const userInfo = useRecoilValue(userInfoAtom);
  const [agoraCode, setAgoraCode] = useState<undefined | string>(undefined);
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const { replace } = useNavigator();
  const { loginWithMini } = useMini();

  const goBackHandler = useCallback((e?) => {
    e?.preventDefault();
    e?.stopPropagation();
    const sharedRef = getQueryString(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'shared',
    );
    if (sharedRef) mini.close();
    mini.close();
  }, []);

  const meetingId = useMemo(() => {
    return getQueryString(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'meeting',
    );
  }, []);

  // redirect to agora meeting page
  const redirectHandler = useCallback(async () => {
    const meetingId = getQueryString(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'meeting',
    );
    if (!meetingId || !agoraCode) return;
    const windowReference = window.open(
      `${process.env.CLIENT_URL}/daangn?#/agora?meeting_code=${agoraCode}`,
      '_blank',
    );
    windowReference;
  }, [agoraCode]);

  // get agora code
  const fetchAgoraCode = useCallback(async () => {
    const result = await getAgoraCode(meetingId);
    if (result.success && result.data?.code) {
      setAgoraCode(result.data.code);
    } else {
      setErrorMsg(
        '현재 대화방 인원이 꽉 찼어요.\n잠시 후 다시 시도해주세요 🙌',
      );
    }
  }, [meetingId]);

  // user login
  useEffect(() => {
    if (!userInfo?.nickname) {
      try {
        loginWithMini();
      } catch (e) {
        replace('/agora/quit?callstate=error');
      }
    }
  }, [loginWithMini, replace, userInfo]);

  // fetch agora code
  useEffect(() => {
    if (userInfo && !agoraCode) {
      logEvent(analytics, 'meeting_bridge_page__show', {
        userNickname: userInfo?.nickname,
        userRegion: userInfo?.region,
      });
      fetchAgoraCode();
    }
  }, [agoraCode, fetchAgoraCode, userInfo]);

  // Android agoraCode 발급시 redirect page
  useEffect(() => {
    if (checkMobileType() === 'Android' && agoraCode !== undefined) {
      redirectHandler();
    }
  }, [agoraCode, redirectHandler]);

  // visibilityState hidden 인경우 mini app 종료
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden' && agoraCode) {
      goBackHandler();
    }
  }, [agoraCode, goBackHandler]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [onVisibilityChange]);

  return (
    <PageWrapper>
      <CustomScreenHelmet
        onCustomBackButton={goBackHandler}
        onCustomCloseButton={goBackHandler}
      />

      <ContentsWrapper className="join WaitingRoom">
        <Image src={orange_house} />
        {errorMsg ? (
          <>
            <Title>{errorMsg}</Title>
            <JoinButton onClick={goBackHandler}>돌아가기</JoinButton>
          </>
        ) : (
          <>
            <Title>모임에 들어가는 중이에요</Title>
            <JoinButton onClick={redirectHandler}>직접 입장하기</JoinButton>
          </>
        )}
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

  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RedirectPage;
