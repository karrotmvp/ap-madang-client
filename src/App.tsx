import React, { lazy, useEffect } from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import { getAnalytics, logEvent } from 'firebase/analytics';

const LandingPage = lazy(() => import('./components/LandingPage'));
const MeetingDetailPage = lazy(() => import('./components/MeetingDetailPage'));
const MeetingSuggestionPage = lazy(
  () => import('./components/MeetingSuggestionPage'),
);
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
const NotServiceRegionPage = lazy(
  () => import('./components/NotServiceRegionPage'),
);

const OnBoardPage = lazy(() => import('./components/OnBoardPage'));
const RedirectPage = lazy(() => import('./components/RedirectPage'));
const ReservationPage = lazy(() => import('./components/ReservationPage'));

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
      <Screen path="/redirect" component={Auth(RedirectPage)} />
      <Screen path="/not-service-region" component={NotServiceRegionPage} />
      <Screen path="*" component={NotFoundPage} />
    </Navigator>
  );
};

export default App;
