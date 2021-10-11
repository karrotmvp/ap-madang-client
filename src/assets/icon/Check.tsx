import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function Check({
  width = '18',
  height = '13',
  fill = 'none',
}: svgProps.svg): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.00001 10.17L2.53001 6.70001C2.14002 6.31001 1.51001 6.31001 1.12001 6.70001C0.730015 7.09001 0.730015 7.72001 1.12001 8.11001L5.30001 12.29C5.69001 12.68 6.32001 12.68 6.71001 12.29L17.29 1.71001C17.68 1.32001 17.68 0.690007 17.29 0.300007C16.9 -0.0899927 16.27 -0.0899927 15.88 0.300007L6.00001 10.17Z" />
    </svg>
  );
}

export default Check;
