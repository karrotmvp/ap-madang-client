import React, { useEffect, useState } from 'react';

interface Props {
  children: JSX.Element[];
  intervalTime?: number;
}
const RotateTitle = ({ intervalTime = 1500, children }: Props) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(idx => (idx + 1 < children.length ? idx + 1 : 0));
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  return <div>{children[idx]}</div>;
};

export default RotateTitle;
