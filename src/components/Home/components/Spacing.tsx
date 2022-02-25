import React from 'react';

import styled from '@emotion/styled';

type Props = {
  width?: string;
  height?: string;
};

function Spacing(props: Props) {
  return <SpacingWrapper {...props} />;
}
const SpacingWrapper = styled.div<{ width?: string; height?: string }>`
  width: ${({ width = '1px' }) => width};
  height: ${({ height = '1px' }) => height};
`;

export default Spacing;
