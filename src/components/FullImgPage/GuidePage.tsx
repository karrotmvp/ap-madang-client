import React, { ReactElement, useEffect } from 'react';

import { logEvent } from '@firebase/analytics';

import { analytics } from '../../App';
import service_guide from '../../assets/image/service_guide.png';
import FullImgPage from './FullImgPage';

function GuidePage(): ReactElement {
  useEffect(() => {
    logEvent(analytics, 'home_banner_service__show');
  }, []);
  return <FullImgPage imgSource={service_guide} />;
}

export default GuidePage;
