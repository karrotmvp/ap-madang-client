import React, { HTMLAttributes } from 'react';

import styled from '@emotion/styled';
import home_banner_00 from '@image/home_banner_00.png';

function Banner(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Container {...props}>
      <BannerImage src={home_banner_00} />
    </Container>
  );
}

const Container = styled.div`
  border-radius: 12px;
  min-height: 7rem;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
`;
export default React.memo(Banner);
