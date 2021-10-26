import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import service_guide from '../../assets/image/service_guide.png';
import CustomScreenHelmet from '../../components/CustomScreenHelmet/CustomScreenHelmet';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

function ServiceGuidePage(): ReactElement {
  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <Image src={service_guide} />
    </PageWrapper>
  );
}

export default ServiceGuidePage;
