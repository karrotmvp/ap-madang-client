import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../constant/color';
import { CREATE_MEETING } from '../../constant/message';
import Divider from '../common/Divider';
import MiddleScreenHelmet from '../common/MiddleScreenHelmet';
import DatePicker from './components/DatePicker';
import InputList from './components/InputList';
import TimePicker from './components/TimePicker';

function CreateForm(): ReactElement {
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  return (
    <CreateMeeting>
      <MiddleScreenHelmet
        appendMiddle={<PageTitle>{CREATE_MEETING.NAVIGATOR_TITLE_2}</PageTitle>}
        appendRight={<NextPageBtn valid={true}>다음</NextPageBtn>}
      />
      <Date>
        <TitleText>모임 날짜</TitleText>
        <GreenInfoText>
          모임 날짜는 일주일 이내로 선택할 수 있어요.
        </GreenInfoText>
        <DatePicker setDate={setDate} />
      </Date>
      <Time>
        <TitleText>모임 시간</TitleText>
        <GreenInfoText>모임 시간은 15분 단위로 설정할 수 있어요.</GreenInfoText>
        <TimePicker date={date} setTime={setTime} />
      </Time>
      {time}
      <Divider size="1.2rem" />
      <AdditionalInfo>
        <TitleText>모임 추가 내용(선택)</TitleText>
        <NoticeText>
          모임 추가 내용은 항목별로 최대 3개까지 입력할 수 있어요.
        </NoticeText>
        <RecommendUser>
          <InputList />
        </RecommendUser>
        <RecommendTopic />
      </AdditionalInfo>
    </CreateMeeting>
  );
}

const CreateMeeting = styled.div`
  width: 100%;
  height: 100%;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03em;
  box-sizing: border-box;
`;

const NextPageBtn = styled.div<{ valid: boolean }>`
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  letter-spacing: -0.03rem;

  color: ${({ valid }) => (valid ? COLOR.LIGHT_GREEN : COLOR.FONT_BODY_GREY)};
`;

const NoticeText = styled.div`
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.03rem;
  color: #ff5638;
`;

// const ValidationInfoWarpper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

const GreenInfoText = styled.div`
  font-size: 1.3rem;
  line-height: 1.8rem;
  letter-spacing: -0.03rem;
  margin-bottom: 1.6rem;
  color: ${COLOR.LIGHT_GREEN};
`;

const TitleText = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;

  margin-bottom: 0.8rem;
  color: ${COLOR.TEXT_BLACK};
`;

const Date = styled.div`
  margin: 1.96rem 1.6rem 0 1.6rem;
`;
const Time = styled.div`
  margin: 3.2rem 1.6rem 4rem 1.6rem;
`;

const AdditionalInfo = styled.div`
  margin: 4rem 1.6rem 5rem 1.6rem;
`;

const RecommendUser = styled.div``;
const RecommendTopic = styled.div``;

export default CreateForm;
