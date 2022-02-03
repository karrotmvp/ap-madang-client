import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import useInterval from '../../../hook/useInterval';
import { COLOR } from '../../../style/color';
dayjs.extend(duration);

interface Props {
  start_time: string;
  end_time: string;
  date: string;
}
type TimeType = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getRemainMilliSec = (
  start_time: string,
  end_time: string,
  date: string,
) => {
  let endDate = dayjs(`${date} ${end_time}`, 'YYYY-MM-DD HH:mm:ss');
  const now = dayjs();
  if (start_time >= end_time) endDate = endDate.add(1, 'day');
  const timeDiff = dayjs.duration(endDate.diff(now)).asMilliseconds();
  return timeDiff;
};

function CurrMeetingTimer({ start_time, end_time, date }: Props): ReactElement {
  const [milliSec, setMilliSec] = useState<number>(0);
  const [time, setTime] = useState<TimeType>();

  const decreaseTime = useCallback(() => {
    const duration = dayjs.duration(milliSec);
    setTime({
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    });
  }, [milliSec]);

  useInterval(
    () => {
      setMilliSec(milliSec - 1000);
      decreaseTime();
    },
    milliSec > 999 ? 1000 : null,
  );

  useEffect(() => {
    if (start_time && !milliSec) {
      const result = getRemainMilliSec(start_time, end_time, date);
      const duration = dayjs.duration(result);
      setTime({
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
      setMilliSec(result);
    }
  }, [start_time, end_time, date, milliSec, decreaseTime]);

  return time ? (
    <TimerStyle className="body3">
      {time && time.hours > 0 && time.hours.toString().padStart(2, '0') + ':'}
      {time &&
        (time.minutes > 0 || time.hours > 0) &&
        time.minutes.toString().padStart(2, '0') + ':'}
      {time && time.seconds.toString().padStart(2, '0')} 후에 종료돼요
    </TimerStyle>
  ) : (
    <div />
  );
}

const TimerStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.4rem;
  color: ${COLOR.ORANGE};
`;

export default CurrMeetingTimer;
