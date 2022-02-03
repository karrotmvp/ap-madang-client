import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import CustomScreenHelmet from './CustomScreenHelmet';

interface Props {
  imgSource: string;
  footer?: ReactElement;
}
function FullImgPage({ imgSource, footer }: Props): ReactElement {
  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <ContentsWrapper>
        <Image src={imgSource} />
      </ContentsWrapper>
      {footer && footer}
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
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default FullImgPage;
