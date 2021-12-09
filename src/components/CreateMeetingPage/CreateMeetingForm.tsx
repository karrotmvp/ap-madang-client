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
import { useForm } from 'react-hook-form';

import { uploadImage } from '../../api/image';
import { createMeeting } from '../../api/meeting';
import audio_disabled from '../../assets/icon/createMeeting/audio_disabled.svg';
import video_disabled from '../../assets/icon/createMeeting/video_disabled.svg';
import { COLOR } from '../../constant/color';
import { CREATE_MEETING } from '../../constant/message';
import useMini from '../../hook/useMini';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import DatePicker from './components/DatePicker';
import EditableTextarea from './components/EditableTextarea';
import ImageUploaderBox from './components/ImageUploaderBox';
import TimePicker from './components/TimePicker';
import WordCounter from './components/WordCounter';

function CreateMeetingForm(): ReactElement {
  const [type, setType] = useState<undefined | 'video' | 'audio'>(undefined);
  const [time, setTime] = useState({ start_time: '', end_time: '' });
  const [image, setImage] = useState<File | null>(null);
  const [trySubmit, setTrySubmit] = useState(false);
  const { loginWithMini } = useMini();
  const { replace } = useNavigator();
  const previewRef = useRef<HTMLImageElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const isValid = useMemo(
    () =>
      watch('title')?.length !== 0 &&
      watch('title')?.length <= 40 &&
      watch('description')?.length !== 0 &&
      watch('description')?.length <= 140 &&
      type !== undefined &&
      watch('date')?.length != 0 &&
      time.start_time.length !== 0 &&
      time.end_time.length !== 0,
    [time.end_time.length, time.start_time.length, type, watch],
  );

  const onSetImageHandler = useCallback(
    async (e?: ChangeEvent<HTMLInputElement>) => {
      if (e && e.target.files) {
        const file = e.target.files[0];
        setImage(file);
      } else setImage(null);
    },
    [],
  );

  const onSubmitBtnHandler = useCallback(
    async data => {
      if (!isValid) return;

      const uploadImageResult = image ? await uploadImage(image) : undefined;

      const result = await createMeeting({
        title: data.title,
        date: data.date,
        start_time: time.start_time.split(' ')[1],
        end_time: time.end_time.split(' ')[1],
        image_url: uploadImageResult,
        is_video: type === 'video' ? true : false,
        description: { text: data.description },
      });
      if (!result.success) return;
      replace(`/meetings/${result.data?.id}`);
    },
    [image, isValid, replace, time.end_time, time.start_time, type],
  );

  return (
    <CreateMeeting>
      <CustomScreenHelmet
        appendMiddle={<PageTitle>{CREATE_MEETING.NAVIGATOR_TITLE}</PageTitle>}
      />

      <form
        onSubmit={handleSubmit(data =>
          loginWithMini(() => onSubmitBtnHandler(data)),
        )}
      >
        <ImageUploaderBox
          previewRef={previewRef}
          onSetImageHandler={onSetImageHandler}
          image={image}
        />
        <Title>
          <TitleText>모임 제목</TitleText>
          <TitleInput
            registerForm={{
              name: 'title',
              config: {
                required: true,
                maxLength: 40,
              },
            }}
            control={control}
            className="body3"
            placeholder="모임 제목을 입력해주세요. (예. 같이 책 읽고 대화 나눠요.)"
            height="8.6rem"
            notValidation={
              watch('title')?.length > 40 || errors.title?.type === 'required'
            }
          />
          <ValidationInfoWarpper>
            <ValidationInfo>
              {watch('title')?.length > 40 && (
                <div>모임 제목은 최대 40자까지 입력할 수 있어요.</div>
              )}
              {errors.title?.type === 'required' && (
                <div>모임 제목을 입력해주세요.</div>
              )}
            </ValidationInfo>
            <WordCounter maxWords={40} words={watch('title') || ''} />
          </ValidationInfoWarpper>
        </Title>
        <Description>
          <TitleText>모임 내용</TitleText>
          <DescriptionInput
            registerForm={{
              name: 'description',
              config: {
                required: true,
                maxLength: 140,
              },
            }}
            control={control}
            placeholder="모임 내용을 자세히 적으면 이웃들이 더 쉽게 참여할 수 있어요."
            height="15.5rem"
            notValidation={
              watch('description')?.length > 140 ||
              errors.description?.type === 'required'
            }
          />
          <ValidationInfoWarpper>
            <ValidationInfo>
              <div>
                {watch('description')?.length > 140 &&
                  '모임 내용은 최대 140자까지 입력할 수 있어요.'}
              </div>
              <div>
                {errors.description?.type === 'required' &&
                  '모임 내용을 입력해주세요.'}
              </div>
            </ValidationInfo>
            <WordCounter maxWords={140} words={watch('description') || ''} />
          </ValidationInfoWarpper>
        </Description>

        <MeetingTypeWrapper>
          <TitleText>모임 진행 방식</TitleText>

          <TypeBtnWrapper>
            <TypeBtn
              selected={type === 'audio'}
              onClick={() => setType('audio')}
              validation={trySubmit && type === undefined}
            >
              <RadioInput
                type="radio"
                id="audio"
                value="audio"
                {...register('type')}
              />
              <TypeContentWrapper>
                <TypeHeader>
                  <TypeIcon src={audio_disabled} />
                  <TypeName>음성모임</TypeName>
                </TypeHeader>
                <TypeInfo>
                  음성모임은 목소리로만 진행되는 모임이에요. 모임 링크는
                  자동으로 생성돼요.
                </TypeInfo>
              </TypeContentWrapper>
            </TypeBtn>
            <TypeBtn
              selected={type === 'video'}
              onClick={() => setType('video')}
              validation={trySubmit && type === undefined}
            >
              <RadioInput
                type="radio"
                id="video"
                value="video"
                {...register('type')}
              />
              <TypeContentWrapper>
                <TypeHeader>
                  <TypeIcon src={video_disabled} />
                  <TypeName>화성모임</TypeName>
                </TypeHeader>
                <TypeInfo>
                  화상모임은 줌(zoom) 링크가 자동으로 생성돼요. 줌 어플을
                  다운로드한 후 이용할 수 있어요.
                </TypeInfo>
              </TypeContentWrapper>
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
          <DatePicker trySubmit={trySubmit} control={control} />
          <ValidationInfoWarpper>
            <ValidationInfo>
              <div>
                {errors.date?.type === 'required' &&
                  '모임 날짜를 선택해주세요.'}
              </div>
            </ValidationInfo>
          </ValidationInfoWarpper>
        </Date>
        <Time>
          <TitleText>모임 시간</TitleText>
          <TimePicker
            date={watch('date')}
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
              <SubmitValidation>
                {trySubmit && !isValid && '모든 항목을 올바르게 입력해주세요'}
              </SubmitValidation>
            </ValidationInfo>
          </ValidationInfoWarpper>
          <SubmitBtn type="submit" onClick={() => setTrySubmit(true)}>
            모임 생성하기
          </SubmitBtn>
        </SubmitArea>
      </form>
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

const TitleInput = styled(EditableTextarea)<{ notValidation: boolean }>`
  border: 1px solid
    ${({ notValidation }) => (notValidation ? '#ff5638' : COLOR.GREY_400)};
  border-radius: 0.6rem;
  padding: 1.6rem 1.6rem 2.4rem 1.6rem;

  &::placeholder {
    color: ${COLOR.PLACEHOLDER_GREY};
    font-weight: 400;
  }

  &:focus {
    outline: none !important;
    border: 1px solid
      ${({ notValidation }) => (notValidation ? '#ff5638' : COLOR.LIGHT_GREEN)};
  }
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

const TypeBtn = styled.label<{ selected: boolean; validation: boolean }>`
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
const SubmitBtn = styled.button`
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
