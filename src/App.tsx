import React, { useEffect } from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { BrowserRouter } from 'react-router-dom';

import Auth from './hoc/Auth';
import LandingPage from './pages/LandingPage/LandingPage';
import MeetingDetailPage from './pages/MeetingDetailPage/MeetingDetailPage';
import MeetingSuggestionPage from './pages/MeetingSuggestionPage/MeetingSuggestionPage';
import NotFoundPage from './pages/NotFountPage/NotFoundPage';
import OnBoardingPage from './pages/OnBoardingPage/OnBoardingPage';
import RedirectPage from './pages/RedirectPage/RedirectPage';
import ReservationPage from './pages/ReservationPage/ReservationPage';
import ServiceGuidePage from './pages/ServiceGuidePage/ServiceGuidePage';
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
    <BrowserRouter>
      <Navigator
        useCustomRouter
        theme="Android"
        onClose={() => mini.close()}
        className={NavigatorStyle}
      >
        <Screen path="/" component={Auth(LandingPage)} />
        <Screen path="/guide" component={ServiceGuidePage} />
        <Screen path="/meetings/:id" component={MeetingDetailPage} />
        <Screen path="/onboarding" component={Auth(OnBoardingPage)} />
        <Screen path="/suggestion/meeting" component={MeetingSuggestionPage} />
        <Screen path="/reservation" component={ReservationPage} />
        <Screen path="/redirect" component={Auth(RedirectPage)} />
        <Screen path="*" component={NotFoundPage} />
      </Navigator>
    </BrowserRouter>
  );
};

export default App;
