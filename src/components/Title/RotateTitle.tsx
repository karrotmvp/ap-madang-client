import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../constant/color';

const RotateTitle = ({ intervalTime = 1500, items }: Props) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(idx => (idx + 1 < items.length ? idx + 1 : 0));
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  return <RotateItem>{items[idx]}</RotateItem>;
};

export default RotateTitle;

interface Props {
  intervalTime?: number;
  items: string[];
}

const RotateItem = styled('div')`
  font-weight: 800;
  font-size: 4.8rem;
  line-height: 5.76rem;
  letter-spacing: -0.08rem;
  padding: 0.7rem 0;
  color: ${COLOR.LIGHT_GREEN};
`;
