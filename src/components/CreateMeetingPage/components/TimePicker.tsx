import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { COLOR } from '../../../constant/color';

interface Props {
  date: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

function TimePicker({ date }: Props): ReactElement {
  const [startList, setStartList] = useState<dayjs.Dayjs[]>([]);
  const [startState, setStartState] = useState('');

  const [endList, setEndList] = useState<dayjs.Dayjs[]>([]);
  const [endState, setEndState] = useState('');

  const startListHandler = useCallback(() => {
    const isToday = dayjs().isSame(date, 'day');
    const day = isToday ? dayjs() : dayjs(date);
    const nextDay = day.add(1, 'day').format('YYYY-MM-DD');
    const remainMin = dayjs(nextDay).diff(day, 'minute');
    for (let i = 0; i < Math.floor(remainMin / 30); i++) {
      const min = day.minute();
      const time = day.add(
        i * 30 + (min % 30 === 0 ? 0 : 30 - (min % 30)),
        'minute',
      );
      setStartList(prevState => {
        return [...prevState, time];
      });
    }
  }, [date]);

  const endListHandler = useCallback(() => {
    const startTime = dayjs(startState);
    for (let i = 1; i <= 6; i++) {
      const time = startTime.add(i * 30, 'minute');
      setEndList(prevState => {
        return [...prevState, time];
      });
    }
  }, [date, startState]);

  useEffect(() => {
    setStartList([]);
    setEndList([]);
    startListHandler();
  }, [date]);

  useEffect(() => {
    setEndList([]);
    startList.length !== 0 && endListHandler();
  }, [startState]);

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

        {startList.map((day, idx) => {
          return (
            <option
              key={idx.toString() + day.toString()}
              value={day.format('YYYY-MM-DD hh:mm')}
            >
              {day.format('a hh:mm')}
            </option>
          );
        })}
      </SelectorStyle>
      <Tilde />
      <SelectorStyle
        className="end_time_selector"
        onChange={e => setEndState(e.target.value)}
        selected={endState ? true : false}
        defaultValue={0}
      >
        <DefaultOption value="종료시간" hidden>
          종료시간
        </DefaultOption>
        {endList.map((day, idx) => {
          return (
            <option
              key={idx.toString() + day.toString()}
              value={day.format('YYYY-MM-DD hh:mm')}
            >
              {day.format('a hh:mm')}
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

  background: url('http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png')
    no-repeat right #ffffff;
  -webkit-appearance: none;
  background-position-x: calc(100% - 20px);
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
