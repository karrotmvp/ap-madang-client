import React, { useEffect } from 'react';

import { css } from '@emotion/css';
import { ThemeProvider } from '@emotion/react';
import { Navigator, Screen } from '@karrotframe/navigator';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { ToastContainer } from 'react-toast';

import CreateGuidePage from './components/CreateGuidePage/CreateGuidePage';
import CreateMeetingForm from './components/CreateMeetingPage/CreateMeetingForm';
import LandingPage from './components/LandingPage';
import LinkGeneratorPage from './components/LinkGeneratorPage';
import MeetingDetailPage from './components/MeetingDetailPage';
const AgoraPage = React.lazy(() => import('./components/MeetingPage'));
import MyPage from './components/MyPage';
import NotFoundPage from './components/NotFountPage';
import NotServiceRegionPage from './components/NotServiceRegionPage';
import QuitMeetingPage from './components/QuitMeetingPage';
import RedirectPage from './components/RedirectPage';
import GuidePage from './components/ServiceGuidePage/GuidePage';
import useMini from './hook/useMini';
import '@karrotframe/navigator/index.css';
import { useTheme } from './hook/useTheme';
import { app } from './util/firebase';
import { checkMobileType } from './util/utils';

const NavigatorStyle = css`
  --kf_navigator_navbar-height: 5.6rem !important;
`;

export const analytics = getAnalytics(app);

const App: React.FC = () => {
  const { ejectApp, loginWithoutMini } = useMini();
  const theme = useTheme();

  useEffect(() => {
    logEvent(analytics, 'launch_app');
    loginWithoutMini();
  }, [loginWithoutMini]);

  return (
    <ThemeProvider theme={theme}>
      <Navigator
        theme={checkMobileType()}
        onClose={ejectApp}
        className={NavigatorStyle}
      >
        <ToastContainer position="bottom-center" delay={2000} />
        <Screen path="/" component={LandingPage} />
        <Screen path="/generator" component={LinkGeneratorPage} />
        <Screen path="/guide/create" component={CreateGuidePage} />
        <Screen path="/guide/service" component={GuidePage} />
        <Screen path="/me" component={MyPage} />
        <Screen path="/meetings/:id" component={MeetingDetailPage} />
        <Screen path="/create" component={CreateMeetingForm} />
        <Screen path="/not-service-region" component={NotServiceRegionPage} />
        <Screen path="/agora" component={AgoraPage} />
        <Screen path="/agora/quit" component={QuitMeetingPage} />
        <Screen path="/redirect" component={RedirectPage} />
        <Screen path="*" component={NotFoundPage} />
      </Navigator>
    </ThemeProvider>
  );
};

export default App;
