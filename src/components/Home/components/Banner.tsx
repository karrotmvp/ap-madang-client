import React, { HTMLAttributes } from 'react';

import styled from '@emotion/styled';
import meeting_list_banner from '@image/meeting_list_banner.png';

function Banner(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Container {...props}>
      <BannerImage src={meeting_list_banner} />
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
