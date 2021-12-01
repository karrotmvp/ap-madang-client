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
    const isToday = dayjs().isSame(date, 'day');
    console.log(date, isToday, dayjs());
    if (isToday) {
      for (let i = 0; i < 7; i++) {
        const now = dayjs();
        const time = dayjs().add(i * 30, 'minute');
        console.log(now);
        setStartList(prevState => {
          return [...prevState, time.toString()];
        });
      }
    }
  }, [date]);

  useEffect(() => {
    initHour();
  }, [initHour]);

  return (
    <TimePickerWrapper>
      <SelectorStyle
        className="start_time_selector"
        onChange={e => setStartState(e.target.value)}
        selected={startState ? true : false}
        defaultValue={0}
      >
        <DefaultOption value="시작시간" hidden>
          시작시간
        </DefaultOption>

        {startList.map(day => {
          return (
            <option key={day.toString()} value={day.toString()}>
              {day}시
            </option>
          );
        })}
      </SelectorStyle>
      <Tilde />
      <SelectorStyle
        className="end_time_selector"
        onChange={e => setTime(e.target.value)}
        selected={startState ? true : false}
        defaultValue={0}
      >
        <DefaultOption value="종료시간" hidden>
          종료시간
        </DefaultOption>
        {startList.map(day => {
          return (
            <option key={day.toString()} value={day.toString()}>
              {day}시
            </option>
          );
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
  margin: 0.8rem;
  width: 0.8rem;
  height: 0.1rem;
  background: ${COLOR.TEXT_BLACK};
`;

export default TimePicker;
