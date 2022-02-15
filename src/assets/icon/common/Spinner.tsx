import React, { ReactElement } from 'react';

interface Props {
  mainColor?: string;
  subColor?: string;
  className?: string;
}

function Spinner({ subColor, mainColor, className }: Props): ReactElement {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9999 37.4433C29.6335 37.4433 37.4432 29.6337 37.4432 20C37.4432 10.3664 29.6335 2.55676 19.9999 2.55676C10.3663 2.55676 2.55664 10.3664 2.55664 20C2.55664 29.6337 10.3663 37.4433 19.9999 37.4433Z"
        stroke={subColor ?? '#D9EEE2'}
        strokeWidth="5"
        strokeMiterlimit="10"
      />
      <path
        d="M20 2.55676C24.6262 2.55676 29.063 4.39451 32.3342 7.66576C34.853 10.1845 36.5219 13.3943 37.1564 16.8495"
        stroke={mainColor ?? '#41AC70'}
        strokeWidth="5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default Spinner;
