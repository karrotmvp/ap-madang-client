import React from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import Mini from '@karrotmarket/mini';

import LandingPage from './pages/LandingPage/LandingPage';
import ReservationPage from './pages/ReservationPage/ReservationPage';
import { checkMobileType } from './util/utils';
export const mini = new Mini();

const NavigatorStyle = css`
  --kf_navigator_navbar-height: 5.6rem;
`;

const App: React.FC = () => (
  <Navigator
    theme={checkMobileType()}
    onClose={() => mini.close()}
    className={NavigatorStyle}
  >
    <Screen path="/" component={ReservationPage} />
    <Screen path="/" component={LandingPage} />
  </Navigator>
);

export default App;
