import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../../../constant/color';

function FinishFooter(): ReactElement {
  return (
    <FooterWrapper className="meeting-detail__footer-nav-bar">
      <Btn>종료된 모임이에요</Btn>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

const Btn = styled.div`
  width: 100%;
  height: 4.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  background: ${COLOR.GREY_300};

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.3rem;
  color: ${COLOR.TEXT_WHITE};
`;

export default FinishFooter;
