import React, { useEffect } from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import { getAnalytics, logEvent } from 'firebase/analytics';

import CreateForm1 from './components/CreateMeetingPage/CreateForm1';
import CreateForm2 from './components/CreateMeetingPage/CreateForm2';
import LandingPage from './components/LandingPage';
import MeetingDetailPage from './components/MeetingDetailPage';
const AgoraPage = React.lazy(() => import('./components/MeetingPage'));
import MeetingSuggestionPage from './components/MeetingSuggestionPage';
import NotFoundPage from './components/NotFountPage';
import NotServiceRegionPage from './components/NotServiceRegionPage';
import OnBoardPage from './components/OnBoardPage';
import ReservationPage from './components/ReservationPage';
import AuthWithoutMini from './hoc/AuthWithoutMini';
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
      <Screen path="/" component={AuthWithoutMini(LandingPage)} />
      <Screen path="/guide" component={OnBoardPage} />
      <Screen
        path="/meetings/:id"
        component={AuthWithoutMini(MeetingDetailPage)}
      />
      <Screen path="/create/form1" component={AuthWithoutMini(CreateForm1)} />
      <Screen path="/create/form2" component={AuthWithoutMini(CreateForm2)} />
      <Screen path="/suggestion/meeting" component={MeetingSuggestionPage} />
      <Screen path="/reservation" component={ReservationPage} />
      <Screen path="/not-service-region" component={NotServiceRegionPage} />
      <Screen path="/agora" component={AgoraPage} />
      <Screen path="*" component={NotFoundPage} />
    </Navigator>
  );
};

export default App;
