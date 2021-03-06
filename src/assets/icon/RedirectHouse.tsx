import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

interface NotiType {
  className?: string;
}

function RedirectHouse({
  width = '40',
  height = '40',
  className,
}: svgProps.svg & NotiType): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="house"
        d="M20 0H16.6667V3.33333H13.3333V6.66667H10V10H6.66667V13.3333H3.33333V16.6667H0V20H3.33333V23.3333V26.6667V30V33.3333V36.6667V40H6.66667H10H13.3333H16.6667H20H23.3333H26.6667H30H33.3333H36.6667V36.6667V33.3333V30V26.6667V23.3333V20H40V16.6667H36.6667V13.3333H33.3333V10H30V6.66667H26.6667V3.33333H23.3333V0H20ZM26.6667 30V26.6667V23.3333H23.3333H20H16.6667H13.3333V26.6667V30V33.3333H16.6667H20H23.3333H26.6667V30Z"
        fill="none"
      />
      <path
        className="window"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6667 23.3333H13.3333V26.6666V29.9999V33.3333H16.6667H20H23.3333H26.6667V29.9999V26.6666V23.3333H23.3333H20H16.6667Z"
        fill="none"
      />
    </svg>
  );
}

export default RedirectHouse;
