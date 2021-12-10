import React, { ReactElement } from 'react';

import service_guide from '../../assets/image/service_guide.png';
import FullImgPage from './FullImgPage';

function GuidePage(): ReactElement {
  return <FullImgPage imgSource={service_guide} />;
}

export default GuidePage;
