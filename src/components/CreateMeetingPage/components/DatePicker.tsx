import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';

import 'dayjs/locale/ko';
import { COLOR } from '../../../constant/color';

dayjs.locale('ko');

interface Props {
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

function DatePicker({ setDate }: Props): ReactElement {
  const [dayList, setDayList] = React.useState<dayjs.Dayjs[]>([]);
  const [dateState, setDateState] = React.useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      const day = dayjs().add(i, 'day');
      setDayList(prevState => {
        return [...prevState, day];
      });
    }
  }, []);

  return (
    <DatePickerWrapper>
      <SelectorStyle
        className="date_picker"
        onChange={e => {
          setDateState(e.target.value);
          setDate(e.target.value);
        }}
        selected={dateState ? true : false}
        defaultValue={0}
      >
        <DefaultOption value="모임 날짜를 선택해주세요." hidden>
          모임 날짜를 선택해주세요.
        </DefaultOption>
        {dayList.map((day, idx) => {
          return (
            <option key={day.toString()} value={day.format('YYYY-MM-DD')}>
              {day.format('YYYY년 MM월 DD일 dd')} (
              {idx !== 0 ? `${idx + 1}일 후` : '오늘'})
            </option>
          );
        })}
      </SelectorStyle>
    </DatePickerWrapper>
  );
}

const DatePickerWrapper = styled.div`
  margin-top: 1.6rem;
`;

const SelectorStyle = styled.select<{ selected: boolean }>`
  width: 100%;
  height: 5.5rem;
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

export default DatePicker;
