import React from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';

import Auth from './hoc/Auth';
import LandingPage from './pages/LandingPage/LandingPage';
import MeetingDetailPage from './pages/MeetingDetailPage/MeetingDetailPage';
import MeetingSuggestionPage from './pages/MeetingSuggestionPage/MeetingSuggestionPage';
import NotFoundPage from './pages/NotFountPage/NotFoundPage';
import OnBoardingPage from './pages/OnBoardingPage/OnBoardingPage';
import RedirectPage from './pages/RedirectPage/RedirectPage';
import ReservationPage from './pages/ReservationPage/ReservationPage';
import mini from './util/mini';
import { checkMobileType } from './util/utils';

const NavigatorStyle = css`
  --kf_navigator_navbar-height: 5.6rem;
`;

const App: React.FC = () => {
  return (
    <Navigator
      theme={checkMobileType()}
      onClose={() => mini.close()}
      className={NavigatorStyle}
    >
      <Screen path="/" component={Auth(LandingPage)} />
      <Screen path="/meetings/:id" component={Auth(MeetingDetailPage)} />
      <Screen path="/onboarding" component={Auth(OnBoardingPage)} />
      <Screen
        path="/suggestion/meeting"
        component={Auth(MeetingSuggestionPage)}
      />
      <Screen path="/reservation" component={ReservationPage} />
      <Screen path="/redirect" component={RedirectPage} />
      <Screen path="*" component={NotFoundPage} />
    </Navigator>
  );
};

export default App;
