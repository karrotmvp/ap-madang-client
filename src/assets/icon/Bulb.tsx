import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function Bulb({
  width = '32',
  height = '32',
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
        d="M16 0C16.5198 0 16.9412 0.421379 16.9412 0.941176V4.27668C16.9412 4.79647 16.5198 5.21785 16 5.21785C15.4802 5.21785 15.0588 4.79647 15.0588 4.27668V0.941176C15.0588 0.421379 15.4802 0 16 0ZM3.63613 4.23979C4.00666 3.87524 4.60256 3.88008 4.96711 4.25061L7.39595 6.71927C7.7605 7.08979 7.75566 7.6857 7.38513 8.05025C7.0146 8.4148 6.4187 8.40996 6.05415 8.03943L3.62531 5.57077C3.26076 5.20024 3.2656 4.60434 3.63613 4.23979ZM28.3185 4.23979C28.6891 4.60434 28.6939 5.20024 28.3293 5.57077L25.9005 8.03943C25.5359 8.40996 24.94 8.4148 24.5695 8.05025C24.199 7.68569 24.1941 7.08979 24.5587 6.71927L26.9875 4.25061C27.3521 3.88008 27.948 3.87524 28.3185 4.23979ZM20.0782 9.83866C18.8231 8.79579 17.2137 8.26864 15.5793 8.36631C13.9449 8.46399 12.4109 9.17899 11.2908 10.3635C10.1707 11.5478 9.54888 13.1119 9.55097 14.7357L9.55098 14.7381C9.54887 16.3692 10.1427 17.9461 11.2228 19.1754C12.2214 20.2383 12.7863 21.6346 12.8055 23.0915L12.8057 23.1039H12.8056V25.3993H19.1263V23.1478C19.1108 21.7108 19.6459 20.3227 20.6217 19.2653C21.2712 18.5565 21.7591 17.7171 22.0526 16.8044C22.3481 15.8857 22.4475 14.9203 22.3327 13.9743L22.3326 13.973C22.1391 12.3606 21.3332 10.8814 20.0782 9.83866ZM15.467 6.48732C17.5774 6.36118 19.6573 7.04166 21.2812 8.39084C22.9052 9.74015 23.9505 11.6566 24.2015 13.7488C24.3503 14.9759 24.2196 16.2146 23.8446 17.3807C23.4676 18.5528 22.8411 19.6299 22.008 20.5386L22.0057 20.5411C21.3533 21.2477 20.9972 22.1741 21.0085 23.1314L21.0087 23.1425H21.0086V26.3405C21.0086 26.8603 20.5872 27.2817 20.0674 27.2817H11.8644C11.3446 27.2817 10.9232 26.8603 10.9232 26.3405V23.1104C10.9088 22.1234 10.524 21.1765 9.84285 20.4556C9.83553 20.4479 9.82833 20.44 9.82128 20.432C8.43191 18.8578 7.66622 16.8332 7.66862 14.7369C7.66862 14.7365 7.66862 14.7361 7.66862 14.7357L8.6098 14.7369L7.66862 14.7381C7.66862 14.7377 7.66862 14.7373 7.66862 14.7369C7.66621 12.6302 8.47323 10.6032 9.92314 9.07006C11.3732 7.5368 13.3565 6.61345 15.467 6.48732ZM0 15.906C0 15.3862 0.421379 14.9648 0.941176 14.9648H4.29621C4.81601 14.9648 5.23739 15.3862 5.23739 15.906C5.23739 16.4258 4.81601 16.8471 4.29621 16.8471H0.941176C0.421379 16.8471 0 16.4258 0 15.906ZM26.6719 15.906C26.6719 15.3862 27.0933 14.9648 27.6131 14.9648H31.0588C31.5786 14.9648 32 15.3862 32 15.906C32 16.4258 31.5786 16.8471 31.0588 16.8471H27.6131C27.0933 16.8471 26.6719 16.4258 26.6719 15.906ZM10.9136 28.6977C10.9136 28.1779 11.335 27.7565 11.8548 27.7565H20.0546C20.5743 27.7565 20.9957 28.1779 20.9957 28.6977C20.9957 29.2175 20.5743 29.6388 20.0546 29.6388H11.8548C11.335 29.6388 10.9136 29.2175 10.9136 28.6977ZM11.8495 31.0588C11.8495 30.539 12.2709 30.1176 12.7907 30.1176H19.1187C19.6384 30.1176 20.0598 30.539 20.0598 31.0588C20.0598 31.5786 19.6384 32 19.1187 32H12.7907C12.2709 32 11.8495 31.5786 11.8495 31.0588Z"
        fill={fill}
      />
    </svg>
  );
}

export default Bulb;