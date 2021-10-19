import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function Clock({
  width = '18',
  height = '18',
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
      <path
        d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z"
        stroke="#85878A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1 11.8L9.4102 10.1102C9.14763 9.84776 9.00008 9.49172 9 9.12045V4.80005"
        stroke="#85878A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Clock;
