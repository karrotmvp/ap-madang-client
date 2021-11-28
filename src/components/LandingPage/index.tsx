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
import { LANDING } from '../../constant/message';
import { userInfoAtom } from '../../store/user';
import { getRegionId } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import CurrMeetingList from './components/MeetingList/CurrMeetingList';
import MeetingList from './components/MeetingList/MeetingList';
import { useRedirect } from './useRedirect';

const LandingPage: React.FC = () => {
  const { push, replace } = useNavigator();

  const [meetings, setMeetings] = useState<MeetingListType[]>([]);
  const userInfo = useRecoilValue(userInfoAtom);
  const redirectUrl = useRedirect();

  const meetingListHandler = useCallback(async () => {
    const region_id = getRegionId(window.location.search);
    const result = await getMeetings(region_id);
    if (result.success && result.data) setMeetings(result.data);
  }, [setMeetings]);

  useEffect(() => {
    if (redirectUrl) replace(redirectUrl);
  }, [redirectUrl, replace]);

  useEffect(() => {
    meetingListHandler();
  }, [meetingListHandler, push, userInfo]);

  useEffect(() => {
    if (userInfo) {
      logEvent(analytics, 'landing_page__show', {
        userRegion: userInfo?.region,
        userNickname: userInfo?.nickname,
      });
      setUserId(analytics, userInfo?.nickname || 'Guest');
    }
  }, [userInfo]);

  return (
    <PageWrapper className="landing">
      <CustomScreenHelmet appendLeft={<PageTitle src={nav_logo} />} />
      <BannerImg
        src={home_banner}
        className="landing__banner-img"
        onClick={() => push('/guide')}
      />
      <div
        style={{ width: '30px', height: '30px' }}
        onClick={() => {
          push('/new');
        }}
      >
        모임 만들기
      </div>
      {meetings.filter(el => el.live_status === 'live').length !== 0 && (
        <div>
          <CurrMeetingList
            className="landing__current"
            meetings={meetings.filter(el => el.live_status === 'live')}
          />
          <Divider className="landing__divider" size="1rem" />
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
          <Divider className="landing__divider" size="1rem" />
        </div>
      )}
      <MeetingList
        className="landing__tomorrow"
        title={LANDING.TOMORROW_MEETING}
        meetings={meetings.filter(el => el.live_status === 'tomorrow')}
        hasMeetings={meetings.length !== 0 ? true : false}
        setMeetings={setMeetings}
      />
      <Divider className="landing__divider" size="1rem" />
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
  padding: 2.4rem 1.6rem 5rem 1.6rem;
`;

const SuggestionImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default LandingPage;
