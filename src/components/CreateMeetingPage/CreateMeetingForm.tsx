import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { CreateMeeting } from 'meeting';

import { uploadImage } from '../../api/image';
import { createMeeting } from '../../api/meeting';
import audio_disabled from '../../assets/icon/createMeeting/audio_disabled.svg';
import video_disabled from '../../assets/icon/createMeeting/video_disabled.svg';
import { COLOR } from '../../constant/color';
import { CREATE_MEETING } from '../../constant/message';
import useMini from '../../hook/useMini';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import SpinnerModal from '../common/SpinnerModal';
import DatePicker from './components/DatePicker';
import EditableTextarea from './components/EditableTextarea';
import ImageUploaderBox from './components/ImageUploaderBox';
import TimePicker from './components/TimePicker';
import WordCounter from './components/WordCounter';

function CreateMeetingForm(): ReactElement {
  const [form, setForm] = useState<CreateMeeting>({
    title: '',
    description: '',
    type: undefined,
    date: '',
    time: { start_time: '', end_time: '' },
    image: null,
  });
  const [submitState, setSubmitState] = useState<{
    state: 'loading' | 'wait' | 'submit';
  }>({ state: 'wait' });
  const { loginWithMini } = useMini();
  const { replace } = useNavigator();
  const previewRef = useRef<HTMLImageElement | null>(null);

  const refParams = useMemo(() => {
    const urlHashParams = new URLSearchParams(
      window.location.hash.substr(window.location.hash.indexOf('?')),
    );
    return urlHashParams.get('ref');
  }, []);

  const isValid = useMemo(
    () =>
      form.title.length !== 0 &&
      form.title.length <= 40 &&
      form.description.length !== 0 &&
      form.description.length <= 140 &&
      form.type !== undefined &&
      form.date.length != 0 &&
      form.time.start_time.length !== 0 &&
      form.time.end_time.length !== 0,
    [form.date, form.description, form.time, form.title, form.type],
  );

  const onSetImageHandler = useCallback(
    async (e?: ChangeEvent<HTMLInputElement>) => {
      if (e && e.target.files) {
        const file = e.target.files[0];
        setForm(prevForm => ({ ...prevForm, image: file }));
      } else setForm(prevForm => ({ ...prevForm, image: null }));
    },
    [],
  );

  const onSubmitBtnHandler = useCallback(async () => {
    setSubmitState({ state: 'loading' });
    if (!isValid) {
      setSubmitState({ state: 'submit' });
      return;
    }

    const uploadImageResult = form.image
      ? await uploadImage(form.image)
      : undefined;

    const result = await createMeeting({
      title: form.title,
      date: form.date,
      start_time: form.time.start_time.split(' ')[1],
      end_time: form.time.end_time.split(' ')[1],
      image_url: uploadImageResult,
      is_video: form.type === 'video' ? true : false,
      description: { text: form.description },
    });
    if (!result.success) return;
    if (refParams === 'banner')
      replace(`/meetings/${result.data?.id}?ref=created`);
    else replace(`/meetings/${result.data?.id}`);
  }, [
    form.date,
    form.description,
    form.image,
    form.time.end_time,
    form.time.start_time,
    form.title,
    form.type,
    isValid,
    refParams,
    replace,
  ]);

  return (
    <CreateMeeting>
      <CustomScreenHelmet
        appendMiddle={<PageTitle>{CREATE_MEETING.NAVIGATOR_TITLE}</PageTitle>}
      />
      <SpinnerModal show={submitState.state === 'loading'} />
      <ImageUploaderBox
        previewRef={previewRef}
        onSetImageHandler={onSetImageHandler}
        image={form.image}
      />
      <Title>
        <TitleText>모임 제목</TitleText>
        <TitleInput
          className="body3"
          placeholder="모임 제목을 입력해주세요. (예. 같이 책 읽고 대화 나눠요.)"
          height="8.6rem"
          validation={
            (submitState.state !== 'submit' && form.title.length < 40) ||
            (submitState.state === 'submit' &&
              form.title.length !== 0 &&
              form.title.length < 40)
          }
          formHandler={(value: string) =>
            setForm(prevState => ({ ...prevState, title: value }))
          }
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            {form.title.length > 40 && (
              <div>모임 제목은 최대 40자까지 입력할 수 있어요.</div>
            )}
            {submitState.state === 'submit' && form.title.length === 0 && (
              <div>모임 제목을 입력해주세요.</div>
            )}
          </ValidationInfo>
          <WordCounter maxWords={40} words={form.title} />
        </ValidationInfoWarpper>
      </Title>
      <Description>
        <TitleText>모임 내용</TitleText>
        <DescriptionInput
          placeholder="모임 내용을 자세히 적으면 이웃들이 더 쉽게 참여할 수 있어요."
          height="15.5rem"
          validation={
            (submitState.state !== 'submit' &&
              form.description.length <= 140) ||
            (submitState.state === 'submit' &&
              form.description.length !== 0 &&
              form.description.length <= 140)
          }
          formHandler={(value: string) =>
            setForm(prevState => ({ ...prevState, description: value }))
          }
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>
              {form.description.length > 140 &&
                '모임 내용은 최대 140자까지 입력할 수 있어요.'}
            </div>
            <div>
              {submitState.state === 'submit' &&
                form.description.length === 0 &&
                '모임 내용을 입력해주세요.'}
            </div>
          </ValidationInfo>
          <WordCounter maxWords={140} words={form.description} />
        </ValidationInfoWarpper>
      </Description>

      <MeetingTypeWrapper>
        <TitleText>모임 진행 방식</TitleText>
        {submitState.state === 'submit' && form.type === undefined && (
          <ValidationInfoWarpper>
            <ValidationInfo>
              <div>모임 진행 방식을 선택해주세요.</div>
            </ValidationInfo>
          </ValidationInfoWarpper>
        )}
        <TypeBtnWrapper>
          <TypeBtn
            onClick={() =>
              setForm(prevState => {
                return { ...prevState, type: 'audio' };
              })
            }
          >
            <RadioInput type="radio" id="audio" name="type" value="audio" />
            <TypeContentWrapper>
              <TypeHeader>
                <TypeIcon src={audio_disabled} />
                <TypeName>음성모임</TypeName>
              </TypeHeader>
              <TypeInfo>
                음성모임은 목소리로만 진행되는 모임이에요. 모임 링크는 자동으로
                생성돼요.
              </TypeInfo>
            </TypeContentWrapper>
          </TypeBtn>
          <TypeBtn
            onClick={() =>
              setForm(prevState => {
                return { ...prevState, type: 'video' };
              })
            }
          >
            <RadioInput type="radio" id="video" name="type" value="video" />
            <TypeContentWrapper>
              <TypeHeader>
                <TypeIcon src={video_disabled} />
                <TypeName>화상모임</TypeName>
              </TypeHeader>
              <TypeInfo>
                화상모임은 줌(zoom) 링크가 자동으로 생성돼요. 줌 어플을
                다운로드한 후 이용할 수 있어요.
              </TypeInfo>
            </TypeContentWrapper>
          </TypeBtn>
        </TypeBtnWrapper>
      </MeetingTypeWrapper>
      <Divider size="1.2rem" />
      <Date>
        <TitleText>모임 날짜</TitleText>
        <GreenInfoText>
          모임 날짜는 일주일 이내로 선택할 수 있어요.
        </GreenInfoText>
        <DatePicker
          submitState={submitState}
          onChange={(value: string) =>
            setForm(prevState => ({ ...prevState, date: value }))
          }
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>
              {submitState.state === 'submit' &&
                (form.date === undefined || form.date.length === 0) &&
                '모임 날짜를 선택해주세요.'}
            </div>
          </ValidationInfo>
        </ValidationInfoWarpper>
      </Date>
      <Time>
        <TitleText>모임 시간</TitleText>
        <TimePicker
          date={form.date}
          time={form.time}
          setForm={setForm}
          trySubmit={submitState.state === 'submit'}
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            <div>
              {submitState.state === 'submit' &&
                form.time.start_time.length === 0 &&
                '모임 시작 시간을 선택해주세요.'}
            </div>
            <div>
              {submitState.state === 'submit' &&
                form.time.end_time.length === 0 &&
                '모임 종료 시간을 선택해주세요.'}
            </div>
          </ValidationInfo>
        </ValidationInfoWarpper>
      </Time>
      <SubmitArea>
        <ValidationInfoWarpper>
          <ValidationInfo>
            <SubmitValidation>
              {submitState.state === 'submit' &&
                !isValid &&
                '모든 항목을 올바르게 입력해주세요'}
            </SubmitValidation>
          </ValidationInfo>
        </ValidationInfoWarpper>
        <SubmitBtn
          onClick={() =>
            submitState.state !== 'loading' && loginWithMini(onSubmitBtnHandler)
          }
        >
          모임 생성하기
        </SubmitBtn>
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

const SubmitValidation = styled.div`
  margin-bottom: 0.6rem;
`;

const GreenInfoText = styled.div`
  font-size: 1.3rem;
  line-height: 1.8rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.LIGHT_GREEN};
  margin-top: 0.8rem;
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
  margin: 0 1.6rem 3.2rem 1.6rem;

  display: flex;
  flex-direction: column;

  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const TitleInput = styled(EditableTextarea)<{ validation: boolean }>`
  /* border: 1px solid
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
  } */
`;

const Description = styled.div`
  margin: 0 1.6rem 3.2rem 1.6rem;

  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const DescriptionInput = styled(EditableTextarea)``;

const MeetingTypeWrapper = styled.div`
  margin: 0 1.6rem 4rem 1.6rem;

  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const TypeBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1.6rem 0;
`;

const TypeIcon = styled.img`
  margin-right: 0.4rem;
`;

const TypeBtn = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  box-sizing: border-box;
  margin-bottom: 2.4rem;
`;

const RadioInput = styled.input`
  min-width: 2rem;
  min-height: 2rem;
  margin-right: 0.6rem;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;

  border: 2px solid ${COLOR.GREY_400};
  border-radius: 100%;

  &:before {
    position: absolute;
    display: block;
    content: '';
    border: 2px solid white;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 100%;
  }

  &:checked {
    background-color: ${COLOR.LIGHT_GREEN};
    border: 2px solid ${COLOR.LIGHT_GREEN};
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 100%;
  }
`;

const TypeContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypeHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.8rem;
  color: ${COLOR.TEXT_BLACK};
`;

const TypeName = styled.div`
  font-size: 1.5rem;
  line-height: 2.3rem;
`;

const TypeInfo = styled.div`
  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_GREY};
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
  width: 100%;
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
