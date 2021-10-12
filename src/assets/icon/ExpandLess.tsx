import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function ExpandLess({
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
      <path d="M5.28997 0.710011L0.699971 5.30001C0.309971 5.69001 0.309971 6.32001 0.699971 6.71001C1.08997 7.10001 1.71997 7.10001 2.10997 6.71001L5.99997 2.83001L9.87997 6.71001C10.27 7.10001 10.9 7.10001 11.29 6.71001C11.68 6.32001 11.68 5.69001 11.29 5.30001L6.69997 0.710011C6.31997 0.320011 5.67997 0.320011 5.28997 0.710011Z" />
    </svg>
  );
}

export default ExpandLess;