import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../constant/color';

interface Props {
  size?: string;
  color?: string;
  className?: string;
}

function Divider({ size, color, className }: Props): ReactElement {
  return (
    <DividerWrapper
      className={classnames(className, 'divider')}
      size={size}
      color={color}
    />
  );
}

const DividerWrapper = styled.div<{ size?: string; color?: string }>`
  border-bottom: ${({ size, color }) =>
    size
      ? `${size} solid ${color || COLOR.GREY_100}`
      : `1px solid ${color || COLOR.GREY_100}`};
`;

export default Divider;
