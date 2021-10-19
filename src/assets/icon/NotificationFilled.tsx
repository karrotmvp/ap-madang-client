import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function NotificationFilled({
  width = '24',
  height = '24',
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 8.5C5.5 4.91015 8.41015 2 12 2C15.5899 2 18.5 4.91015 18.5 8.5V16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H18.5H5.5H4C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16H5.5V8.5ZM15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19H15Z"
        fill={fill}
      />
    </svg>
  );
}

export default NotificationFilled;
