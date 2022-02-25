import React from 'react';

import styled from '@emotion/styled';

type Props = { size?: string };

function LineDivider({ size = '0.1rem' }: Props) {
  return <LineDividerStyle size={size} />;
}

const LineDividerStyle = styled.div<Props>`
  width: 100%;
  height: ${({ size }) => size};
  background: rgba(33, 33, 36, 0.07);
`;

export default LineDivider;
