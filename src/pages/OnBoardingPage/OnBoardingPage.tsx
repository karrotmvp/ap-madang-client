import React, { ReactElement, useEffect } from 'react';

import { ScreenHelmet } from '@karrotframe/navigator';
import Cookies from 'universal-cookie';

function OnBoardingPage(): ReactElement {
  const cookie = new Cookies();

  useEffect(() => {
    cookie.set('onboard', true);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="on-board">
      <ScreenHelmet />
      <div style={{ height: '30px', border: '1px solid black' }}>
        onBoarding Page입니다.
      </div>
    </div>
  );
}

export default OnBoardingPage;
