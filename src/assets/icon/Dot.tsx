import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function Dot({
  width = '5',
  height = '5',
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
      <circle cx="2.5" cy="2.5" r="2.5" fill="#999999" />
    </svg>
  );
}

export default Dot;
