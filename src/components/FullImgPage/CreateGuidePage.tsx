import React, { ReactElement } from 'react';

import create_meeting_guide from '../../assets/image/create_meeting_guide.png';
import CreateFooter from './components/CreateFooter';
import FullImgPage from './FullImgPage';

function CreateGuidePage(): ReactElement {
  return (
    <FullImgPage imgSource={create_meeting_guide} footer={<CreateFooter />} />
  );
}

export default CreateGuidePage;
