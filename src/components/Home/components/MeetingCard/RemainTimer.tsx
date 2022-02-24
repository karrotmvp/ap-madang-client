import React from 'react';

import styled from '@emotion/styled';
import { getRemainMilliSec } from '@util/utils';

import useRemainTime from '../../hook/useRemainTime';

type Props = {
  start_time: string;
  end_time: string;
  date: string;
};

function RemainTimer({ start_time, end_time, date }: Props) {
  const remainMilliSec = getRemainMilliSec(start_time, end_time, date);
  const { remainTime } = useRemainTime({ remainMilliSec });

  const isRemain10Min = remainTime.hours === 0 && remainTime.minutes <= 10;
  const isRemainUnder1Min = isRemain10Min && remainTime.minutes < 1;

  return isRemain10Min ? (
    <Wrapper>
      {isRemainUnder1Min
        ? `1분 이내에 종료돼요.`
        : `${remainTime.minutes}분 뒤 종료돼요.`}
    </Wrapper>
  ) : null;
}

const Wrapper = styled.div`
  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: -0.04rem;
  color: ${({ theme }) => theme.colors.$carrot500};
`;

export default RemainTimer;
