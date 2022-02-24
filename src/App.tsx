import React, { useEffect } from 'react';

import { css } from '@emotion/css';
import { ThemeProvider } from '@emotion/react';
import { getAnalytics, logEvent } from '@firebase/analytics';
import { Navigator, Screen } from '@karrotframe/navigator';

import '@karrotframe/navigator/index.css';

import CreateGuidePage from './components/CreateGuidePage/CreateGuidePage';
import CreatePage from './components/CreatePage';
import Home from './components/Home';
import LinkGeneratorPage from './components/LinkGeneratorPage';
import MeetingDetailPage from './components/MeetingDetailPage';
import MyPage from './components/MyPage';
import GuidePage from './components/ServiceGuidePage/GuidePage';
import useMini from './hook/useMini';
import ToastContainer from './lib/Toast/components/ToastContainer';
import { carrotTheme } from './style/carrotTheme';
import { app } from './util/firebase';
import { checkMobileType } from './util/utils';
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));
const NotServiceRegionPage = React.lazy(
  () => import('./components/NotServiceRegionPage'),
);
const QuitMeetingPage = React.lazy(
  () => import('./components/QuitMeetingPage'),
);
const AgoraPage = React.lazy(() => import('./components/MeetingPage'));
const RedirectPage = React.lazy(() => import('./components/RedirectPage'));
const ShortURLPage = React.lazy(() => import('./components/ShortURLPage'));

const NavigatorStyle = css`
  --kf_navigator_navbar-height: 5.6rem !important;
`;

export const analytics = getAnalytics(app);

const App = () => {
  const { ejectApp, loginWithMini } = useMini();

  useEffect(() => {
    logEvent(analytics, 'launch_app');
    loginWithMini();
  }, [loginWithMini]);

  return (
    <ThemeProvider theme={carrotTheme}>
      <ToastContainer delay={TOAST_DELAY}>
        <Navigator
          theme={checkMobileType()}
          onClose={ejectApp}
          className={NavigatorStyle}
        >
          <Screen path="/" component={Home} />
          <Screen path="/generator" component={LinkGeneratorPage} />
          <Screen path="/guide/create" component={CreateGuidePage} />
          <Screen path="/guide/service" component={GuidePage} />
          <Screen path="/me" component={MyPage} />
          <Screen path="/meetings/:id" component={MeetingDetailPage} />
          <Screen path="/create" component={CreatePage} />
          <Screen path="/not-service-region" component={NotServiceRegionPage} />
          <Screen path="/agora" component={AgoraPage} />
          <Screen path="/agora/quit" component={QuitMeetingPage} />
          <Screen path="/redirect" component={RedirectPage} />
          <Screen path="/short" component={ShortURLPage} />
          <Screen path="*" component={NotFoundPage} />
        </Navigator>
      </ToastContainer>
    </ThemeProvider>
  );
};

export const TOAST_DELAY = 3000;

export default App;
