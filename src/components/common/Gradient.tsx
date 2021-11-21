import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

interface Props {
  gradient: string;
  children: ReactElement;
  className?: string;
}

function Gradient({ gradient, children, className }: Props): ReactElement {
  return (
    <GradientStyle
      gradient={gradient}
      className={classnames('gradient', className)}
    >
      {children}
    </GradientStyle>
  );
}

const GradientStyle = styled.div<{ gradient: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;

    background: ${({ gradient }) => gradient};
  }
`;

export default Gradient;
