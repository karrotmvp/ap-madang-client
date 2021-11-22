/** @jsx jsx */
import React, { useCallback, useEffect, useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { logEvent, setUserId } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import { MeetingList as MeetingListType } from 'meeting';
import { useRecoilValue } from 'recoil';

import { getMeetings } from '../../api/meeting';
import { analytics } from '../../App';
import home_banner from '../../assets/image/home_banner.png';
import nav_logo from '../../assets/image/nav_logo.png';
import suggestion_img from '../../assets/image/suggestion_img.png';
import { COLOR } from '../../constant/color';
import { LANDING } from '../../constant/message';
import { userInfoAtom } from '../../store/user';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import CurrMeetingList from './components/MeetingList/CurrMeetingList';
import MeetingList from './components/MeetingList/MeetingList';
import { useRedirect } from './useRedirect';

const LandingPage: React.FC = () => {
  const { push, replace } = useNavigator();

  const [meetings, setMeetings] = useState<MeetingListType[]>([]);
  const userInfo = useRecoilValue(userInfoAtom);
  const redirectUrl = useRedirect();

  const meetingListHandler = useCallback(async () => {
    const result = await getMeetings();
    if (result.success && result.data) setMeetings(result.data);
  }, [setMeetings]);

  useEffect(() => {
    if (redirectUrl) replace(redirectUrl);
  }, [redirectUrl, replace]);

  useEffect(() => {
    if (userInfo) {
      meetingListHandler();
      setUserId(analytics, userInfo.nickname);
    }
  }, [meetingListHandler, userInfo, push]);

  useEffect(() => {
    if (userInfo)
      logEvent(analytics, 'landing_page__show', {
        userRegion: userInfo?.region,
        userNickname: userInfo?.nickname,
      });
  }, [userInfo]);

  return (
    <PageWrapper className="landing">
      <CustomScreenHelmet appendLeft={<PageTitle src={nav_logo} />} />
      <BannerImg
        src={home_banner}
        className="landing__banner-img"
        onClick={() => push('/guide')}
      />
      {meetings.filter(el => el.live_status === 'live').length !== 0 && (
        <div>
          <CurrMeetingList
            className="landing__current"
            meetings={meetings.filter(el => el.live_status === 'live')}
          />
          <BlockDivider className="landing__divider" />
        </div>
      )}
      {meetings.filter(el => el.live_status === 'upcoming').length !== 0 && (
        <div>
          <MeetingList
            className="landing__upoming"
            title={LANDING.UPCOMING_MEETING}
            meetings={meetings.filter(el => el.live_status === 'upcoming')}
            hasMeetings={meetings.length !== 0 ? true : false}
            setMeetings={setMeetings}
          />
          <BlockDivider className="landing__divider" />
        </div>
      )}
      <MeetingList
        className="landing__tomorrow"
        title={LANDING.TOMORROW_MEETING}
        meetings={meetings.filter(el => el.live_status === 'tomorrow')}
        hasMeetings={meetings.length !== 0 ? true : false}
        setMeetings={setMeetings}
      />
      <BlockDivider className="landing__divider" />
      <SuggestionBannerWrapper>
        <SuggestionImg
          src={suggestion_img}
          onClick={() => push('/suggestion/meeting')}
        />
      </SuggestionBannerWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageTitle = styled.img`
  margin-left: 3.2rem;
  height: 33%;
  width: auto;
`;

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuggestionBannerWrapper = styled.div`
  padding: 3rem 1.6rem 5rem 1.6rem;
`;

const SuggestionImg = styled.img`
  width: 100%;
  height: 100%;
`;

const BlockDivider = styled.div`
  min-height: 1rem;
  background-color: ${COLOR.BLOCK_DIVIDER_GRAY};
`;

export default LandingPage;
