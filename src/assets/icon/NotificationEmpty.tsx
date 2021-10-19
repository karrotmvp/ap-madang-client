import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function NotificationEmpty({
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
        d="M16.5 16V8.5C16.5 6.01472 14.4853 4 12 4C9.51472 4 7.5 6.01472 7.5 8.5V16H16.5ZM5.5 8.5V16H4C3.44772 16 3 16.4477 3 17C3 17.5523 3.44772 18 4 18H5.5H7.5H16.5H18.5H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H18.5V8.5C18.5 4.91015 15.5899 2 12 2C8.41015 2 5.5 4.91015 5.5 8.5ZM15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19H15Z"
        fill={fill}
      />
    </svg>
  );
}

export default NotificationEmpty;