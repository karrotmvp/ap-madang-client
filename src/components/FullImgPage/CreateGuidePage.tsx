import React, { ReactElement, useEffect } from 'react';

import { logEvent } from '@firebase/analytics';

import { analytics } from '../../App';
import create_meeting_guide from '../../assets/image/create_meeting_guide.png';
import CreateFooter from './components/CreateFooter';
import FullImgPage from './FullImgPage';

function CreateGuidePage(): ReactElement {
  useEffect(() => {
    logEvent(analytics, 'home_banner_create_meeting__show');
  }, []);
  return (
    <FullImgPage imgSource={create_meeting_guide} footer={<CreateFooter />} />
  );
}

export default CreateGuidePage;
