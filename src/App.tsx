import React from 'react';

import { css } from '@emotion/css';
import { Navigator, Screen } from '@karrotframe/navigator';
import Mini from '@karrotmarket/mini';

import ReservationPage from './pages/ReservationPage/ReservationPage';

export const mini = new Mini();

const NavigatorStyle = css`
  --kf_navigator_navbar-height: 5rem;
`;

const App: React.FC = () => (
  <Navigator
    theme="Cupertino"
    onClose={() => mini.close()}
    className={NavigatorStyle}
  >
    <Screen path="/" component={ReservationPage} />
  </Navigator>
);

export default App;
