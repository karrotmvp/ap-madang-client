/** @jsx jsx */
import React, { useCallback, useEffect } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { ScreenHelmet, useNavigator } from '@karrotframe/navigator';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

import { getMeetings } from '../../api/meeting';
import MeetingList from '../../components/MeetingList/MeetingList';
import { LANDING } from '../../constant/message';
import { meetingsAtom } from '../../store/meeting';
import { userInfoAtom } from '../../store/user';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  margin-left: 20px;
`;

const Banner = styled.div`
  box-sizing: border-box;
  width: 100%;

  padding: 20px;
  background-color: #ffdf8b;
  margin-bottom: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const LandingPage: React.FC = () => {
  const cookie = new Cookies();
  const setMeetings = useSetRecoilState(meetingsAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  const meetingListHandler = useCallback(async () => {
    const result = await getMeetings();
    console.log('meetingListHandler', new Cookies().get('Authorization'));
    if (!result.success || !result.data) {
      console.log(result);
      return;
    }
    if (result.data) setMeetings(result.data);
  }, [setMeetings]);

  useEffect(() => {
    console.log(userInfo);

    if (!onBoard) {
      return;
    }
    if (userInfo) meetingListHandler();
    // eslint-disable-next-line
  }, [meetingListHandler, userInfo, onBoard]);

  return !userInfo ? (
    <div>인증중!</div>
  ) : (
    <PageWrapper>
      <ScreenHelmet
        appendLeft={<PageTitle>{LANDING.NAVIGATOR_TITLE}</PageTitle>}
      />
      <Banner>{/* TODO: 배너 이미지 삽입*/}랜.동.모 하이~👋</Banner>
      <MeetingList title={LANDING.CURRENT_MEETING} />
      <MeetingList title={LANDING.UPCOMING_MEETING} />
    </PageWrapper>
  );
};

export default LandingPage;
