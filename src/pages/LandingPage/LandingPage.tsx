/** @jsx jsx */
import React, { useCallback, useEffect } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { ScreenHelmet, useNavigator } from '@karrotframe/navigator';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

import { getMeetings } from '../../api/meeting';
import home_banner from '../../assets/image/home_banner.png';
import suggestion_img from '../../assets/image/suggestion_img.png';
import MeetingList from '../../components/MeetingList/MeetingList';
import { COLOR } from '../../constant/color';
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

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuggestionBannerWrapper = styled.div`
  padding: 3rem 1.6rem 4rem 1.6rem;
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
  const cookie = new Cookies();
  const setMeetings = useSetRecoilState(meetingsAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const onBoard = cookie.get('onboard');

  const { push } = useNavigator();

  const meetingListHandler = useCallback(async () => {
    const result = await getMeetings();
    if (!result.success || !result.data) {
      return;
    }
    if (result.data) setMeetings(result.data);
  }, [setMeetings]);

  useEffect(() => {
    if (!onBoard) {
      push('/onboarding');
      return;
    }
    if (userInfo) meetingListHandler();
  }, [meetingListHandler, userInfo, onBoard, push]);

  return (
    <PageWrapper>
      <ScreenHelmet
        appendLeft={<PageTitle>{LANDING.NAVIGATOR_TITLE}</PageTitle>}
      />
      <BannerImg src={home_banner} />
      <MeetingList title={LANDING.CURRENT_MEETING} />
      <BlockDivider />
      <MeetingList title={LANDING.UPCOMING_MEETING} />
      <BlockDivider />
      <MeetingList title={LANDING.TOMORROW_MEETING} />
      <BlockDivider />
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
