/** @jsx jsx */
import React, { useCallback, useEffect, useState } from 'react';

import { jsx, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import { MeetingList as MeetingListType } from 'meeting';
import { useRecoilValue } from 'recoil';

import { getMeetings } from '../../api/meeting';
import { analytics } from '../../App';
import nav_my_page from '../../assets/icon/common/nav_my_page.svg';
import big_plus__white from '../../assets/icon/landingPage/big_plus__white.svg';
import tooltip_close__white from '../../assets/icon/landingPage/tooltip_close__white.svg';
import nav_logo from '../../assets/image/nav_logo.png';
import { COLOR } from '../../constant/color';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import { getRegionId } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import CarouselBanner from './components/CarouselBanner';
import CurrMeetingList from './components/MeetingList/CurrMeetingList';
import MeetingList from './components/MeetingList/MeetingList';
import { useRedirect } from './useRedirect';

const LandingPage: React.FC = () => {
  const { push, replace } = useNavigator();
  const [showTooltip, setShowTooltip] = useState(false);
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

  const tooltipCloseHandler = () => {
    const tooltip = window.localStorage.getItem('create_btn_tooltip');
    if (!tooltip) {
      window.localStorage.setItem('create_btn_tooltip', 'true');
      setShowTooltip(false);
    }
  };

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
    const tooltip = window.localStorage.getItem('create_btn_tooltip');
    if (!tooltip) setShowTooltip(true);
  }, []);

  return (
    <PageWrapper className="landing">
      <CustomScreenHelmet
        appendMiddle={<PageTitle src={nav_logo} />}
        appendRight={
          <UserIcon
            src={nav_my_page}
            onClick={() => loginWithMini(myPageHandler)}
          />
        }
      />

      <CarouselBanner />
      <Divider size="0.1rem" color={COLOR.GREY_400} />
      <Divider size="0.9rem" color={COLOR.GREY_200} />
      <CreateBtnWrapper>
        {showTooltip && (
          <ToolTipOutside>
            <ToolTip>
              버튼을 눌러 모임을 만들어 보세요{' '}
              <ToolTipIcon
                src={tooltip_close__white}
                onClick={() => tooltipCloseHandler()}
              />
            </ToolTip>
          </ToolTipOutside>
        )}
        <CreateBtn
          onClick={() => {
            tooltipCloseHandler();
            push('/create');
          }}
        >
          <img src={big_plus__white} />
        </CreateBtn>
      </CreateBtnWrapper>
      {/* {meetings.length === 0 && <SkeletonCard />} */}
      {meetings.filter(el => el.live_status === 'live').length !== 0 && (
        <div>
          <CurrMeetingList
            className="landing__current"
            meetings={meetings.filter(el => el.live_status === 'live')}
          />
          <Divider className="landing__divider" size="1rem" />
        </div>
      )}

      <div>
        <MeetingList
          className="landing__upoming"
          meetings={meetings.filter(
            el => el.live_status !== 'live' && el.live_status !== 'finish',
          )}
          hasMeetings={meetings.length !== 0}
          setMeetings={setMeetings}
        />
      </div>
    </PageWrapper>
  );
};

const tooltipAni = keyframes`
  0% {
    transform: translate3d(0,0,0);
  }
  50% {
    transform: translate3d(0, -5px, 0);
  }
  
`;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageTitle = styled.img`
  height: 1.43rem;
  width: auto;
`;

const UserIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;

  margin-right: 1.6rem;
`;

const CreateBtnWrapper = styled.div`
  position: -webkit-sticky; /* 사파리 브라우저 지원 */
  position: sticky;
  top: calc(100% - 9rem);
  left: calc(100% - 7.6rem);
  width: 0;
  height: 0;
  z-index: 1000;
`;

const CreateBtn = styled.div`
  position: 0;
  box-sizing: border-box;
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

const ToolTipOutside = styled.div`
  position: relative;
  width: calc(100vw - 2rem);
  right: calc(100vw - 7.6rem);
`;

const ToolTip = styled.div`
  animation: ${tooltipAni} 1s ease infinite;
  position: absolute;
  max-width: calc(100vw - 3.2rem);
  box-sizing: border-box;
  padding: 1.1rem 1.2rem;
  background: ${COLOR.GREY_900};
  border-radius: 0.6rem;
  bottom: 1rem;
  right: 0;

  font-size: 1.3rem;
  line-height: 2rem;
  color: ${COLOR.TEXT_WHITE};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 2.1rem;
    width: 0;
    height: 0;
    border: 0.7rem solid transparent;
    border-top-color: ${COLOR.GREY_900};
    border-bottom: 0;
    margin-left: -0.7rem;
    margin-bottom: -0.7rem;
  }
`;

const ToolTipIcon = styled.img`
  margin-left: 0.6rem;
`;

export default LandingPage;
