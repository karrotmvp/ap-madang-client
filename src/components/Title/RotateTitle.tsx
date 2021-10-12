import React, { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../constant/color';

const RotateItem = styled('div')`
  font-weight: 800;
  font-size: 4.8rem;
  line-height: 5.76rem;
  letter-spacing: -0.08rem;
  padding: 0.7rem 0;
  color: ${COLOR.LIGHT_GREEN};
`;

const RotateTitle = ({ intervalTime = 1500, items }: Props): ReactElement => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(idx => (idx + 1 < items.length ? idx + 1 : 0));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [intervalTime, items.length]);

  return <RotateItem>{items[idx]}</RotateItem>;
};

export default RotateTitle;

interface Props {
  intervalTime?: number;
  items: string[];
}
