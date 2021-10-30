/** @jsx jsx */
import React, { useCallback, useEffect } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { logEvent, setUserId } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getMeetings } from '../../api/meeting';
import { analytics } from '../../App';
import home_banner from '../../assets/image/home_banner.png';
import suggestion_img from '../../assets/image/suggestion_img.png';
import CustomScreenHelmet from '../../components/CustomScreenHelmet/CustomScreenHelmet';
import CurrMeetingList from '../../components/MeetingList/CurrMeetingList';
import MeetingList from '../../components/MeetingList/MeetingList';
import { COLOR } from '../../constant/color';
import { LANDING } from '../../constant/message';
import { currMeetings, meetingsAtom } from '../../store/meeting';
import { userInfoAtom } from '../../store/user';
import { useRedirect } from './useRedirect';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageTitle = styled.div`
  margin-left: 20px;
  color: ${COLOR.TEXT_BLACK};
`;

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuggestionBannerWrapper = styled.div`
  padding: 3rem 1.6rem 3rem 1.6rem;
`;

const SuggestionImg = styled.img`
  width: 100%;
  height: 100%;
`;

const BlockDivider = styled.div`
  min-height: 1rem;
  background-color: ${COLOR.BLOCK_DIVIDER_GRAY};
`;

const LandingPage: React.FC = () => {
  const { push, replace } = useNavigator();

  const setMeetings = useSetRecoilState(meetingsAtom);
  const currMeetingsValue = useRecoilValue(currMeetings);
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
    if (userInfo?.nickname && userInfo?.region) {
      meetingListHandler();
      setUserId(analytics, userInfo.nickname);
    }
  }, [meetingListHandler, userInfo, push, replace]);

  useEffect(() => {
    logEvent(analytics, 'first_open');
  }, []);

  return (
    <PageWrapper className="landing">
      <CustomScreenHelmet
        appendLeft={
          <PageTitle className="landing__nav-title title3">
            {LANDING.NAVIGATOR_TITLE}
          </PageTitle>
        }
      />
      <BannerImg
        src={home_banner}
        className="landing__banner-img"
        onClick={() => push('/guide')}
      />
      {currMeetingsValue.length !== 0 && (
        <div>
          <CurrMeetingList className="landing__current" />
          <BlockDivider className="landing__divider" />
        </div>
      )}
      <MeetingList
        className="landing__upoming"
        title={LANDING.UPCOMING_MEETING}
      />
      <BlockDivider className="landing__divider" />
      <MeetingList
        className="landing__tomorrow"
        title={LANDING.TOMORROW_MEETING}
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

export default LandingPage;
