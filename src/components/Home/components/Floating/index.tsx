import React from 'react';

import styled from '@emotion/styled';

import CreateButton from './CreateButton';
function FloatingComps() {
  return (
    <Wrapper>
      <CreateButton />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: -webkit-sticky; /* 사파리 브라우저 지원 */
  position: sticky;
  top: calc(100% - 9rem);
  left: calc(100% - 7.6rem);
  width: 0;
  height: 0;
  z-index: 1000;
`;

export default FloatingComps;
