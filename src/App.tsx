import React, { useEffect } from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import { getAnalytics, logEvent } from 'firebase/analytics';

import Auth from './hoc/Auth';
import LandingPage from './pages/LandingPage/LandingPage';
import MeetingDetailPage from './pages/MeetingDetailPage/MeetingDetailPage';
import MeetingSuggestionPage from './pages/MeetingSuggestionPage/MeetingSuggestionPage';
import NotFoundPage from './pages/NotFountPage/NotFoundPage';
import NotServiceRegionPage from './pages/NotServiceRegionPage/NotServiceRegionPage';
import OnBoardPage from './pages/OnBoardPage/OnBoardPage';
import RedirectPage from './pages/RedirectPage/RedirectPage';
import ReservationPage from './pages/ReservationPage/ReservationPage';
import { app } from './util/firebase';
import mini from './util/mini';

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
      theme="Android"
      onClose={() => mini.close()}
      className={NavigatorStyle}
    >
      <Screen path="/" component={Auth(LandingPage)} />
      <Screen path="/guide" component={OnBoardPage} />
      <Screen path="/meetings/:id" component={Auth(MeetingDetailPage)} />
      <Screen path="/suggestion/meeting" component={MeetingSuggestionPage} />
      <Screen path="/reservation" component={ReservationPage} />
      <Screen path="/redirect" component={Auth(RedirectPage)} />
      <Screen path="/not-service-region" component={NotServiceRegionPage} />
      <Screen path="*" component={NotFoundPage} />
    </Navigator>
  );
};

export default App;
