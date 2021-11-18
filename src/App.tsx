import React, { useEffect } from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import { getAnalytics, logEvent } from 'firebase/analytics';

import LandingPage from './components/LandingPage';
import MeetingDetailPage from './components/MeetingDetailPage';
import AgoraPage from './components/MeetingPage';
import MeetingSuggestionPage from './components/MeetingSuggestionPage';
import NotFoundPage from './components/NotFountPage';
import NotServiceRegionPage from './components/NotServiceRegionPage';
import OnBoardPage from './components/OnBoardPage';
import ReservationPage from './components/ReservationPage';
import Auth from './hoc/Auth';
import { app } from './util/firebase';
import mini from './util/mini';
import { checkMobileType } from './util/utils';

const NavigatorStyle = css`
  --kf_navigator_navbar-height: 5.6rem !important;
`;

export const analytics = getAnalytics(app);

const App: React.FC = () => {
  useEffect(() => {
    logEvent(analytics, 'launch_app');
  }, []);

  return (
    <Navigator
      theme={checkMobileType()}
      onClose={() => mini.close()}
      className={NavigatorStyle}
    >
      <Screen path="/" component={Auth(LandingPage)} />
      <Screen path="/guide" component={OnBoardPage} />
      <Screen path="/meetings/:id" component={Auth(MeetingDetailPage)} />
      <Screen path="/suggestion/meeting" component={MeetingSuggestionPage} />
      <Screen path="/reservation" component={ReservationPage} />
      <Screen path="/not-service-region" component={NotServiceRegionPage} />
      <Screen path="/agora" component={AgoraPage} />
      <Screen path="*" component={NotFoundPage} />
    </Navigator>
  );
};

export default App;
