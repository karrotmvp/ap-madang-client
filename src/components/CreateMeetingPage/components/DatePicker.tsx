import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FieldValues, useController, Control } from 'react-hook-form';

import 'dayjs/locale/ko';

import { COLOR } from '../../../constant/color';
dayjs.locale('ko');

interface Props {
  trySubmit: boolean;
  control: Control<FieldValues>;
}

function DatePicker({ trySubmit, control }: Props): ReactElement {
  const [dayList, setDayList] = React.useState<dayjs.Dayjs[]>([]);
  const [dateState, setDateState] = React.useState<string | undefined>(
    undefined,
  );
  const {
    field: { onChange },
  } = useController({
    name: 'date',
    control,
    rules: { required: true },
  });

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
          onChange(e.target.value);
        }}
        selected={dateState ? true : false}
        trySubmit={trySubmit}
      >
        <DefaultOption value={''} hidden>
          모임 날짜를 선택해주세요.
        </DefaultOption>
        {dayList.map(day => {
          return (
            <option key={day.toString()} value={day.format('YYYY-MM-DD')}>
              {day.format('MM월 DD일 dddd')}
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

const SelectorStyle = styled.select<{ selected: boolean; trySubmit: boolean }>`
  width: 100%;
  height: 5.5rem;
  color: ${({ selected }) => (selected ? COLOR.TEXT_BLACK : COLOR.GREY_500)};

  background-color: white;
  box-sizing: border-box;
  border-radius: 0.6rem;
  padding: 0 20px;
  background: url('http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png')
    no-repeat right #ffffff;
  -webkit-appearance: none;
  background-position-x: calc(100% - 20px);

  border: 1px solid
    ${({ trySubmit, selected }) =>
      !selected && trySubmit ? '#ff5638' : '#cbcccd'};
`;

const DefaultOption = styled.option`
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

export default DatePicker;
