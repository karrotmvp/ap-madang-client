import React, { ReactElement } from 'react';
import { svgProps } from 'customProps';

const Arrow_back_and = ({
  width = '16',
  height = '16',
  fill = 'none',
}: svgProps.svg): ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 7H3.82998L8.70998 2.12C9.09998 1.73 9.09998 1.09 8.70998 0.700001C8.31998 0.310001 7.68998 0.310001 7.29998 0.700001L0.70998 7.29C0.31998 7.68 0.31998 8.31 0.70998 8.7L7.29998 15.29C7.68998 15.68 8.31998 15.68 8.70998 15.29C9.09998 14.9 9.09998 14.27 8.70998 13.88L3.82998 9H15C15.55 9 16 8.55 16 8C16 7.45 15.55 7 15 7Z" />
    </svg>
  );
};

export default Arrow_back_and;
