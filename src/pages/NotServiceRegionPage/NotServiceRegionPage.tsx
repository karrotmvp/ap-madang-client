import React, { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';

import { analytics } from '../../App';
import scratching from '../../assets/image/scratching.png';
import CustomScreenHelmet from '../../components/CustomScreenHelmet/CustomScreenHelmet';
import { COLOR } from '../../constant/color';
import { NOT_SERVICE_REGION } from '../../constant/message';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotServiceImg = styled.img`
  width: 8rem;
  height: 7.4rem;
  margin-bottom: 1.2rem;
`;

const Text = styled.span`
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 3.3rem;
  text-align: center;
  letter-spacing: -0.04rem;
`;

const BoldText = styled(Text)`
  color: ${COLOR.LIGHT_GREEN};
`;

function NotServiceRegionPage(): ReactElement {
  const [region, setRegion] = useState('');

  useEffect(() => {
    const urlHashParams = new URLSearchParams(
      window.location.hash.substr(window.location.hash.indexOf('?')),
    );
    const decoded = decodeURIComponent(urlHashParams.get('region') || '');
    setRegion(decoded || '');
    logEvent(analytics, 'not_service_region_page', {
      region: decoded,
    });
  }, []);

  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <NotServiceImg src={scratching} />
      <Text>
        <BoldText>{region}</BoldText>
        {NOT_SERVICE_REGION.TITLE}
      </Text>
    </PageWrapper>
  );
}

export default NotServiceRegionPage;
