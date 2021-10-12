import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function ExpandMore({
  width = '12',
  height = '8',
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
      <path d="M9.87998 1.29L5.99998 5.17L2.11998 1.29C1.72998 0.899998 1.09998 0.899998 0.70998 1.29C0.31998 1.68 0.31998 2.31 0.70998 2.7L5.29998 7.29C5.68998 7.68 6.31998 7.68 6.70998 7.29L11.3 2.7C11.69 2.31 11.69 1.68 11.3 1.29C10.91 0.909998 10.27 0.899998 9.87998 1.29Z" />
    </svg>
  );
}

export default ExpandMore;
