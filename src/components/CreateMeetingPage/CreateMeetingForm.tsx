import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import { createMeeting } from '../../api/meeting';
import audio_active from '../../assets/icon/createMeeting/audio_active.svg';
import audio_disabled from '../../assets/icon/createMeeting/audio_disabled.svg';
import video_active from '../../assets/icon/createMeeting/video_active.svg';
import video_disabled from '../../assets/icon/createMeeting/video_disabled.svg';
import { COLOR } from '../../constant/color';
import { CREATE_MEETING } from '../../constant/message';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import DatePicker from './components/DatePicker';
import EditableTextarea from './components/EditableTextarea';
import TimePicker from './components/TimePicker';
import WordCounter from './components/WordCounter';

function CreateMeetingForm(): ReactElement {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<undefined | 'video' | 'audio'>(undefined);
  const [date, setDate] = useState('');
  const [time, setTime] = useState({ start_time: '', end_time: '' });
  const [trySubmit, setTrySubmit] = useState(false);

  const { replace } = useNavigator();

  const isValid = useMemo(
    () =>
      title.length !== 0 &&
      title.length <= 40 &&
      description.length !== 0 &&
      description.length <= 140 &&
      type !== undefined &&
      date.length != 0 &&
      time.start_time.length !== 0 &&
      time.end_time.length !== 0,
    [
      date.length,
      description.length,
      time.end_time.length,
      time.start_time.length,
      title.length,
      type,
    ],
  );

  const onSubmitBtnHandler = useCallback(async () => {
    setTrySubmit(true);
    if (!isValid) return;

    const result = await createMeeting({
      title,
      date: date,
      start_time: time.start_time.split(' ')[1],
      end_time: time.end_time.split(' ')[1],
      is_video: type === 'video' ? true : false,
      description: { text: description },
    });
    if (!result.success) return;
    replace(`/meetings/${result.data?.id}`);

    // TODO: submit data;
  }, [
    date,
    description,
    isValid,
    replace,
    time.end_time,
    time.start_time,
    title,
    type,
  ]);

  return (
    <CreateMeeting>
      <CustomScreenHelmet
        appendMiddle={<PageTitle>{CREATE_MEETING.NAVIGATOR_TITLE}</PageTitle>}
      />
      <Title>
        <TitleText>모임 제목</TitleText>
        <TitleInput
          className="body3"
          placeholder="모임 제목을 입력해주세요. (예. 같이 책 읽고 대화 나눠요.)"
          height="8.6rem"
          formHandler={setTitle}
          validation={title.length < 40 || (trySubmit && title.length === 0)}
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>{title.length > 40 && '제목의 길이를 줄여주세요.'}</div>
            <div>
              {trySubmit && title.length === 0 && '모임 제목을 입력해주세요.'}
            </div>
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
          validation={
            description.length < 140 || (trySubmit && description.length === 0)
          }
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>{description.length > 140 && '내용의 길이를 줄여주세요.'}</div>
            <div>
              {trySubmit &&
                description.length === 0 &&
                '모임 내용을 입력해주세요.'}
            </div>
          </ValidationInfo>
          <WordCounter maxWords={140} words={description} />
        </ValidationInfoWarpper>
      </Description>
      <MeetingTypeWrapper>
        <TitleText>모임 진행 방식</TitleText>
        <GreenInfoText>
          원하는 모임 진행 방식을 선택하면 모임 링크가 자동으로 생성돼요.
        </GreenInfoText>
        <TypeBtnWrapper>
          <TypeBtn
            selected={type === 'audio'}
            onClick={() => setType('audio')}
            validation={trySubmit && type === undefined}
          >
            <TypeIcon src={type === 'audio' ? audio_active : audio_disabled} />
            음성모임
          </TypeBtn>
          <TypeBtn
            selected={type === 'video'}
            onClick={() => setType('video')}
            validation={trySubmit && type === undefined}
          >
            <TypeIcon src={type === 'video' ? video_active : video_disabled} />
            화상모임
          </TypeBtn>
        </TypeBtnWrapper>
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>
              {trySubmit &&
                type === undefined &&
                '모임 진행 방식을 선택해주세요.'}
            </div>
          </ValidationInfo>
        </ValidationInfoWarpper>
      </MeetingTypeWrapper>
      <Divider size="1.2rem" />
      <Date>
        <TitleText>모임 날짜</TitleText>
        <GreenInfoText>
          모임 날짜는 일주일 이내로 선택할 수 있어요.
        </GreenInfoText>
        <DatePicker setDate={setDate} trySubmit={trySubmit} />
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>
              {trySubmit && date.length === 0 && '모임 날짜를 선택해주세요.'}
            </div>
          </ValidationInfo>
        </ValidationInfoWarpper>
      </Date>
      <Time>
        <TitleText>모임 시간</TitleText>
        <GreenInfoText>모임 시간은 30분 단위로 설정할 수 있어요.</GreenInfoText>
        <TimePicker
          date={date}
          time={time}
          setTime={setTime}
          trySubmit={trySubmit}
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>
              {trySubmit &&
                time.start_time.length === 0 &&
                '모임 시작 시간을 선택해주세요.'}
            </div>
            <div>
              {trySubmit &&
                time.end_time.length === 0 &&
                '모임 종료 시간을 선택해주세요.'}
            </div>
          </ValidationInfo>
        </ValidationInfoWarpper>
      </Time>
      <SubmitArea>
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>
              {trySubmit && !isValid && '모든 항목을 올바르게 입력해주세요'}
            </div>
          </ValidationInfo>
        </ValidationInfoWarpper>
        <SubmitBtn onClick={onSubmitBtnHandler}>모임 생성하기</SubmitBtn>
      </SubmitArea>
    </CreateMeeting>
  );
}

const CreateMeeting = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03em;
  box-sizing: border-box;
`;

const ValidationInfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.6rem;
`;

const ValidationInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.03rem;
  color: #ff5638;
`;

const GreenInfoText = styled.div`
  font-size: 1.3rem;
  line-height: 1.8rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.LIGHT_GREEN};
  margin-bottom: 1.6rem;
`;

const TitleText = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;

  margin-bottom: 0.8rem;
  color: ${COLOR.TEXT_BLACK};
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

const TitleInput = styled(EditableTextarea)<{ validation: boolean }>`
  border: 1px solid
    ${({ validation }) => (validation ? COLOR.GREY_400 : '#ff5638')};
  border-radius: 0.6rem;
  padding: 1.6rem 1.6rem 2.4rem 1.6rem;

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

const DescriptionInput = styled(EditableTextarea)``;

const MeetingTypeWrapper = styled.div`
  margin: 3.2rem 1.6rem 4rem 1.6rem;

  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const TypeBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.6rem;
`;

const TypeIcon = styled.img`
  margin-right: 0.4rem;
`;

const TypeBtn = styled.div<{ selected: boolean; validation: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: calc(50% - 0.6rem);
  border-radius: 0.6rem;

  box-sizing: border-box;

  padding: 1.3rem 0;

  border: ${({ selected }) => {
    return selected
      ? `1px solid ${COLOR.LIGHT_GREEN}`
      : `1px solid ${COLOR.GREY_400}`;
  }};
  color: ${({ selected }) => {
    return selected ? COLOR.TEXT_WHITE : COLOR.GREY_700;
  }};
  background: ${({ selected }) => {
    return selected ? COLOR.LIGHT_GREEN : COLOR.TEXT_WHITE;
  }};
  border: 1px solid
    ${({ validation, selected }) =>
      !selected && validation ? '#ff5638' : COLOR.GREY_400};
`;

const Date = styled.div`
  margin: 1.96rem 1.6rem 0 1.6rem;
`;
const Time = styled.div`
  margin: 3.2rem 1.6rem 4rem 1.6rem;
`;

const SubmitArea = styled.div`
  margin: 6rem 1.6rem 4rem 1.6rem;
`;
const SubmitBtn = styled.div`
  background: ${COLOR.LIGHT_GREEN};
  border-radius: 0.6rem;
  padding: 1.3rem 0;

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;

  text-align: center;
  letter-spacing: -0.03rem;

  color: ${COLOR.TEXT_WHITE};
`;

export default CreateMeetingForm;
