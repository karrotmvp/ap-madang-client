import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';

import { COLOR } from '../../../constant/color';

interface Props {
  date: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

function TimePicker({ date, setTime }: Props): ReactElement {
  const [startList, setStartList] = useState<string[]>([]);
  const [startState, setStartState] = useState<string | undefined>(undefined);

  const initHour = useCallback(() => {
    const isToday = dayjs().isSame(dayjs(date));
    if (isToday) {
      for (let i = 0; i < 7; i++) {
        const now = dayjs();
        setStartList(prevState => {
          return [...prevState, now.hour().toString()];
        });
      }
    }
  }, [date]);

  useEffect(() => {
    initHour();
  }, [initHour]);

  console.log(setTime);

  return (
    <TimePickerWrapper>
      <input type="time" step="7200" />
      <SelectorStyle
        className="w150"
        onChange={e => setStartState(e.target.value)}
        selected={startState ? true : false}
      >
        <DefaultOption value="시작시간" selected disabled hidden>
          시작시간
        </DefaultOption>
        {startList.map(day => {
          return <option value={day.toString()}>{day}시</option>;
        })}
      </SelectorStyle>
      <Tilde>-</Tilde>
      <SelectorStyle
        className="w150"
        onChange={e => setTime(e.target.value)}
        selected={startState ? true : false}
      >
        <DefaultOption value="종료시간" selected disabled hidden>
          종료시간
        </DefaultOption>
        {startList.map(day => {
          return <option value={day.toString()}>{day}시</option>;
        })}
      </SelectorStyle>
    </TimePickerWrapper>
  );
}

const TimePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const SelectorStyle = styled.select<{ selected: boolean }>`
  width: 100%;
  height: 4.7rem;
  color: ${({ selected }) => (selected ? COLOR.TEXT_BLACK : COLOR.GREY_500)};
  border: 1px solid #cbcccd;
  background-color: white;
  box-sizing: border-box;
  border-radius: 0.6rem;
`;

const DefaultOption = styled.option`
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const Tilde = styled.div`
  margin: 0 0.8rem;
`;

export default TimePicker;
