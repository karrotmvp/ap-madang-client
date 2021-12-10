import React, { useEffect } from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { ToastContainer } from 'react-toast';

import CreateMeetingForm from './components/CreateMeetingPage/CreateMeetingForm';
import CreateGuidePage from './components/FullImgPage/CreateGuidePage';
import GuidePage from './components/FullImgPage/GuidePage';
import LandingPage from './components/LandingPage';
import MeetingDetailPage from './components/MeetingDetailPage';
const AgoraPage = React.lazy(() => import('./components/MeetingPage'));
import MeetingSuggestionPage from './components/MeetingSuggestionPage';
import MyPage from './components/MyPage';
import NotFoundPage from './components/NotFountPage';
import NotServiceRegionPage from './components/NotServiceRegionPage';
import ReservationPage from './components/ReservationPage';
import useMini from './hook/useMini';
import { app } from './util/firebase';
import { checkMobileType } from './util/utils';

const NavigatorStyle = css`
  --kf_navigator_navbar-height: 5.6rem !important;
`;

export const analytics = getAnalytics(app);

const App: React.FC = () => {
  const { ejectApp, loginWithoutMini } = useMini();

  useEffect(() => {
    logEvent(analytics, 'launch_app');
    loginWithoutMini();
  }, [loginWithoutMini]);

  return (
    <Navigator
      theme={checkMobileType()}
      onClose={ejectApp}
      className={NavigatorStyle}
    >
      <ToastContainer position="bottom-center" delay={2000} />
      <Screen path="/" component={LandingPage} />
      <Screen path="/create-guide" component={CreateGuidePage} />
      <Screen path="/guide" component={GuidePage} />
      <Screen path="/me" component={MyPage} />
      <Screen path="/meetings/:id" component={MeetingDetailPage} />
      <Screen path="/create" component={CreateMeetingForm} />
      <Screen path="/suggestion/meeting" component={MeetingSuggestionPage} />
      <Screen path="/reservation" component={ReservationPage} />
      <Screen path="/not-service-region" component={NotServiceRegionPage} />
      <Screen path="/agora" component={AgoraPage} />
      <Screen path="*" component={NotFoundPage} />
    </Navigator>
  );
};

export default App;
