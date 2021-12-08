/** @jsx jsx */
import React, { useCallback, useEffect, useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import { MeetingList as MeetingListType } from 'meeting';
import { useRecoilValue } from 'recoil';

import { getMeetings } from '../../api/meeting';
import { analytics } from '../../App';
import big_plus__white from '../../assets/icon/landingPage/big_plus__white.svg';
import home_banner from '../../assets/image/home_banner.png';
import nav_logo from '../../assets/image/nav_logo.png';
import suggestion_img from '../../assets/image/suggestion_img.png';
import { COLOR } from '../../constant/color';
import useMini from '../../hook/useMini';
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
  const { loginWithMini } = useMini();

  const meetingListHandler = useCallback(async () => {
    const region_id = getRegionId(window.location.search);
    const result = await getMeetings(region_id);
    if (result.success && result.data)
      setMeetings(
        result.data.sort((a, b) => {
          if (a.date === b.date) return a.start_time < b.start_time ? -1 : 1;
          return a.date < b.date ? -1 : 1;
        }),
      );
  }, [setMeetings]);

  const myPageHandler = () => {
    push('/me');
  };

  useEffect(() => {
    if (redirectUrl) replace(redirectUrl);
  }, [redirectUrl, replace]);

  useEffect(() => {
    meetingListHandler();
  }, [meetingListHandler, push, userInfo]);

  useEffect(() => {
    logEvent(analytics, 'landing_page__show');
  }, []);

  return (
    <PageWrapper className="landing">
      <CustomScreenHelmet
        appendMiddle={<PageTitle src={nav_logo} />}
        appendRight={<UserIcon onClick={() => loginWithMini(myPageHandler)} />}
      />
      <BannerImg
        src={home_banner}
        className="landing__banner-img"
        onClick={() => push('/guide')}
      />
      <CreateBtn onClick={() => push('/create')}>
        <img src={big_plus__white} />
      </CreateBtn>

      {meetings.filter(el => el.live_status === 'live').length !== 0 && (
        <div>
          <CurrMeetingList
            className="landing__current"
            meetings={meetings.filter(el => el.live_status === 'live')}
          />
          <Divider className="landing__divider" size="1rem" />
        </div>
      )}
      {meetings.filter(
        el => el.live_status !== 'live' && el.live_status !== 'finish',
      ).length !== 0 && (
        <div>
          <MeetingList
            className="landing__upoming"
            meetings={meetings.filter(
              el => el.live_status !== 'live' && el.live_status !== 'finish',
            )}
            hasMeetings={meetings.length !== 0 ? true : false}
            setMeetings={setMeetings}
          />
          <Divider className="landing__divider" size="1rem" />
        </div>
      )}
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
  height: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageTitle = styled.img`
  height: 1.43rem;
  width: auto;
`;

const UserIcon = styled.div`
  background: gray;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
`;

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateBtn = styled.div`
  position: fixed;
  bottom: 3.2rem;
  right: 2rem;
  z-index: 1000;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: ${COLOR.LIGHT_GREEN};
  color: ${COLOR.TEXT_WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  line-height: 5.6rem;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

const SuggestionBannerWrapper = styled.div`
  padding: 2.4rem 1.6rem 5rem 1.6rem;
`;

const SuggestionImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default LandingPage;
