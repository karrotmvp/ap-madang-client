import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../constant/color';
import { CREATE_MEETING } from '../../constant/message';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import DatePicker from './components/DatePicker';
import EditableTextarea from './components/EditableTextarea';
import InputList from './components/InputList';
import TimePicker from './components/TimePicker';
import WordCounter from './components/WordCounter';

// type CreateMeetingInfoProps = {
//   title?: string;
//   date?: string;
//   start_time?: string;
//   end_time?: string;
//   is_video?: boolean;
//   description?: {
//     text?: string;
//     recommend_user?: { text: string }[];
//     recommend_topic?: { text: string }[];
//   };
// };

function CreateMeetingPage(): ReactElement {
  // const [info, setInfo] = useState<CreateMeetingInfoProps>({});
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  return (
    <CreateMeeting>
      <CustomScreenHelmet
        appendLeft={<PageTitle>{CREATE_MEETING.NAVIGATOR_TITLE_1}</PageTitle>}
      />
      <Title>
        <TitleText>모임 제목</TitleText>
        <TitleInput
          className="body3"
          placeholder="모임 제목을 입력해주세요."
          value={title}
          onChange={e => setTitle(e.target.value)}
          validation={title.length < 40}
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            {title.length > 40 ? '제목의 길이를 줄여주세요.' : ''}
          </ValidationInfo>
          <WordCounter maxWords={40} words={title} />
        </ValidationInfoWarpper>
      </Title>
      <Description>
        <TitleText>모임 내용</TitleText>
        <DescriptionInput
          placeholder="모임 내용을 자세히 적으면 이웃들이 더 쉽게 참여할 수 있어요."
          height="15.5rem"
          formHandler={setDescription}
          validation={description.length < 140}
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            {description.length > 140 ? '내용의 길이를 줄여주세요.' : ''}
          </ValidationInfo>
          <WordCounter maxWords={140} words={description} />
        </ValidationInfoWarpper>
      </Description>
      <Divider size="1.2rem" />
      <Date>
        <TitleText>모임 날짜</TitleText>
        <NoticeText>모임 날짜는 일주일 이내로 선택할 수 있어요.</NoticeText>
        <DatePicker setDate={setDate} />
      </Date>
      <Time>
        <TitleText>모임 시간</TitleText>
        <NoticeText>모임 시간은 15분 단위로 설정할 수 있어요.</NoticeText>
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
  margin-left: 3.2rem;
  box-sizing: border-box;
`;

const ValidationInfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ValidationInfo = styled.div`
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.03rem;
  color: #ff5638;
`;

const TitleText = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;

  margin-bottom: 0.8rem;
  color: ${COLOR.TEXT_BLACK};
`;

const NoticeText = styled.div`
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.03rem;
  color: #ff5638;
`;

const Title = styled.div`
  width: auto;
  box-sizing: border-box;
  margin: 1.96rem 1.6rem 0 1.6rem;

  display: flex;
  flex-direction: column;

  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const TitleInput = styled.input<{ validation: boolean }>`
  border: 1px solid
    ${({ validation }) => (validation ? COLOR.GREY_400 : '#ff5638')};
  border-radius: 0.6rem;
  padding: 1.6rem 1.6rem 2.4rem 1.6rem;
  margin-bottom: 0.6rem;

  &::placeholder {
    color: ${COLOR.PLACEHOLDER_GREY};
    font-weight: 400;
  }

  &:focus {
    outline: none !important;
    border: 1px solid
      ${({ validation }) => (validation ? COLOR.LIGHT_GREEN : '#ff5638')};
  }
`;

const Description = styled.div`
  margin: 3.2rem 1.6rem 4rem 1.6rem;

  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const DescriptionInput = styled(EditableTextarea)`
  margin-bottom: 0.6rem;
`;

const Date = styled.div`
  margin: 4rem 1.6rem 0 1.6rem;
`;
const Time = styled.div`
  margin: 3.2rem 1.6rem 4rem 1.6rem;
`;

const AdditionalInfo = styled.div`
  margin: 4rem 1.6rem 5rem 1.6rem;
`;

const RecommendUser = styled.div``;
const RecommendTopic = styled.div``;

export default CreateMeetingPage;
