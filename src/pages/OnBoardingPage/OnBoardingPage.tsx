import React, { ReactElement, useEffect } from 'react';

import Cookies from 'universal-cookie';

import CustomScreenHelmet from '../../components/CustomScreenHelmet/CustomScreenHelmet';

function OnBoardingPage(): ReactElement {
  const cookie = new Cookies();

  useEffect(() => {
    cookie.set('onboard', true);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="on-board">
      <CustomScreenHelmet />
      <div style={{ height: '30px', border: '1px solid black' }}>
        onBoarding Page입니다.
      </div>
    </div>
  );
}

export default OnBoardingPage;
