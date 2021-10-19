import React, { ReactElement } from 'react';

import { svgProps } from 'customProps';

function ExpandRight({
  width = '11',
  height = '20',
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
        d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM10 10L10.7071 10.7071C11.0976 10.3166 11.0976 9.68342 10.7071 9.29289L10 10ZM0.292893 18.2929C-0.0976311 18.6834 -0.0976311 19.3166 0.292893 19.7071C0.683417 20.0976 1.31658 20.0976 1.70711 19.7071L0.292893 18.2929ZM0.292893 1.70711L9.29289 10.7071L10.7071 9.29289L1.70711 0.292893L0.292893 1.70711ZM9.29289 9.29289L0.292893 18.2929L1.70711 19.7071L10.7071 10.7071L9.29289 9.29289Z"
        fill="#19191A"
      />
    </svg>
  );
}

export default ExpandRight;
