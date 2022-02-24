import { useCallback, useEffect, useState } from 'react';

import useInterval from '@hook/useInterval';
import dayjs from 'dayjs';

type Props = {
  remainMilliSec: number;
};

type TimeType = {
  hours: number;
  minutes: number;
  seconds: number;
};

function useRemainTime({ remainMilliSec }: Props) {
  const [milliSec, setMilliSec] = useState<number>(remainMilliSec);
  const [remainTime, setRemainTime] = useState<TimeType>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const decreaseTime = useCallback(() => {
    const duration = dayjs.duration(milliSec);
    setRemainTime({
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
    decreaseTime();
  }, [decreaseTime]);

  return { remainTime };
}

export default useRemainTime;
