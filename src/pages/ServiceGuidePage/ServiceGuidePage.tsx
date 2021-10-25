import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { ScreenHelmet } from '@karrotframe/navigator';

import nav_back from '../../assets/icon/nav_back.svg';
import service_guide from '../../assets/image/service_guide.png';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const NavCustomBtn = styled.img`
  margin-left: 1.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

function ServiceGuidePage(): ReactElement {
  return (
    <PageWrapper>
      <ScreenHelmet customBackButton={<NavCustomBtn src={nav_back} />} />
      <Image src={service_guide} />
    </PageWrapper>
  );
}

export default ServiceGuidePage;
