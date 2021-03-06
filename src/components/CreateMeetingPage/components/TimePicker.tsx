import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { TimeType } from 'meeting';
import { z } from 'zod';

import nav_close from '../../../assets/icon/common/nav_close.svg';
import { COLOR } from '../../../style/color';
import { FormValid } from '../CreateMeetingForm';

interface Props {
  date: string;
  time: TimeType;
  setForm: React.Dispatch<React.SetStateAction<z.infer<typeof FormValid>>>;
  trySubmit: boolean;
}

function TimePicker({ date, time, setForm, trySubmit }: Props): ReactElement {
  const [startList, setStartList] = useState<dayjs.Dayjs[]>([]);
  const [endList, setEndList] = useState<dayjs.Dayjs[]>([]);

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
    if (!time.start_time) return;
    const startTime = dayjs(time.start_time);
    for (let i = 1; i <= 6; i++) {
      const time = startTime.add(i * 30, 'minute');
      setEndList(prevState => {
        return [...prevState, time];
      });
    }
  }, [time.start_time]);

  useEffect(() => {
    setStartList([]);
    setEndList([]);
    setForm(prevState => ({
      ...prevState,
      time: { start_time: '', end_time: '' },
    }));
    date && startListHandler();
  }, [date, setForm, startListHandler]);

  useEffect(() => {
    setEndList([]);
    setForm(prevState => {
      return { ...prevState, time: { ...prevState.time, end_time: '' } };
    });
    time.start_time !== '' && endListHandler();
  }, [endListHandler, setForm, time.start_time]);
  return (
    <TimePickerWrapper>
      <SelectorStyle
        className="start_time_selector"
        onChange={e => {
          setForm(prevState => ({
            ...prevState,
            time: { start_time: e.target.value, end_time: '' },
          }));
        }}
        selected={time.start_time !== '' ? true : false}
        trySubmit={trySubmit}
      >
        <DefaultOption value={''} hidden>
          ????????????
        </DefaultOption>

        {startList.map((day, idx) => {
          return (
            <SelectOption
              key={idx.toString() + day.toString()}
              value={day.format('YYYY-MM-DD HH:mm:00')}
            >
              {day.format('a hh:mm')}
            </SelectOption>
          );
        })}
      </SelectorStyle>
      <Tilde />
      <SelectorStyle
        className="end_time_selector"
        onChange={e => {
          setForm(prevState => ({
            ...prevState,
            time: { ...prevState.time, end_time: e.target.value },
          }));
        }}
        selected={time.end_time ? true : false}
        trySubmit={trySubmit}
      >
        <DefaultOption value={''} hidden>
          ????????????
        </DefaultOption>
        {endList.map((day, idx) => {
          return (
            <SelectOption
              key={idx.toString() + day.toString()}
              value={day.format('YYYY-MM-DD HH:mm:00')}
            >
              {day.format('a hh:mm')}
            </SelectOption>
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

const SelectorStyle = styled.select<{ selected: boolean; trySubmit: boolean }>`
  width: 100%;
  height: 4.7rem;
  color: ${({ selected }) => (selected ? COLOR.TEXT_BLACK : COLOR.GREY_500)};
  padding: 0 1.6rem;
  background-color: white;
  box-sizing: border-box;
  border-radius: 0.6rem;
  font-size: 1.5rem;
  line-height: 2.3rem;

  -webkit-appearance: none;
  background-position-x: calc(100% - 20px);

  border: 1px solid
    ${({ trySubmit, selected }) =>
      !selected && trySubmit ? '#ff5638' : '#cbcccd'};

  &:focus {
    outline: none;
    border: 2px solid ${COLOR.LIGHT_GREEN};
    border-radius: 0.6rem;
  }
`;

const DefaultOption = styled.option`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};

  &:after {
    content: ${nav_close};
    background-color: red;
    background-size: 28px 28px;
    height: 28px;
    width: 28px;
  }
`;

const Tilde = styled.div`
  margin: 0.8rem;
  width: 0.8rem;
  height: 0.1rem;
  background: ${COLOR.TEXT_BLACK};
`;

const SelectOption = styled.option`
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
`;

export default TimePicker;
