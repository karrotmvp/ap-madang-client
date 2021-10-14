import React, { ReactElement } from 'react';

import { ScreenHelmet, useNavigator } from '@karrotframe/navigator';
import Cookies from 'universal-cookie';

function OnBoardingPage(): ReactElement {
  const cookie = new Cookies();
  const { replace } = useNavigator();
  const popHandler = () => {
    cookie.set('onboard', true);
    replace('/');
  };

  return (
    <div>
      <ScreenHelmet />
      <div
        onClick={popHandler}
        style={{ height: '30px', border: '1px solid black' }}
      >
        onBoarding Page입니다.
      </div>
    </div>
  );
}

export default OnBoardingPage;
