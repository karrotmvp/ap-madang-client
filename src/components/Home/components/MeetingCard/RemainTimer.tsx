import React from 'react';

import styled from '@emotion/styled';
import { getRemainMilliSec } from '@util/utils';
import { liveStatusType } from 'meeting-v2';

import useRemainTime from '../../hook/useRemainTime';

type Props = {
  start_time: string;
  end_time: string;
  date: string;
  live_status: liveStatusType;
};

function RemainTimer({ start_time, end_time, date, live_status }: Props) {
  const remainMilliSec = getRemainMilliSec(start_time, end_time, date);
  const { remainTime } = useRemainTime({ remainMilliSec });

  const isRemain10Min = remainTime.hours === 0 && remainTime.minutes <= 10;
  const isRemainUnder1Min = isRemain10Min && remainTime.minutes < 1;

  return isRemain10Min && live_status === 'live' ? (
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
