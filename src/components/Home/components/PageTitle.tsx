import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

function PageTitle() {
  const theme = useTheme();
  return (
    <Container>
      <TextWrapper>
        <ColorText color={theme.colors.$carrot500}>지금</ColorText> 열려있는
        <br />
        실시간 온라인 모임방
      </TextWrapper>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const TextWrapper = styled.span`
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.04rem;
`;

const ColorText = styled(TextWrapper)<{ color: string }>`
  color: ${({ color }) => color};
`;

export default PageTitle;
