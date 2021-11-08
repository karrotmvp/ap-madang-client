import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';

import { analytics } from '../../App';
import service_guide from '../../assets/image/service_guide.png';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

function OnBoardPage(): ReactElement {
  useEffect(() => {
    logEvent(analytics, 'guide_page__show');
  }, []);

  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <ContentsWrapper>
        <Image src={service_guide} />
      </ContentsWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;
  box-sizing: border-box;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default OnBoardPage;
