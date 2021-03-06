import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import { CreateMeeting } from 'meeting';
import { z } from 'zod';

import { uploadImage } from '../../api/image';
import { createMeeting } from '../../api/meeting';
import { analytics } from '../../App';
import audio_disabled from '../../assets/icon/createMeeting/audio_disabled.svg';
import video_disabled from '../../assets/icon/createMeeting/video_disabled.svg';
import { CREATE_MEETING } from '../../constant/message';
import useMini from '../../hook/useMini';
import { COLOR } from '../../style/color';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import SpinnerModal from '../common/Spinner/SpinnerModal';
import DatePicker from './components/DatePicker';
import EditableTextarea from './components/EditableTextarea';
import ImageUploaderBox from './components/ImageUploaderBox';
import TimePicker from './components/TimePicker';
import WordCounter from './components/WordCounter';

const TitleMaxValid = z.string().max(40);
const TitleMinValid = z.string().min(1);
const TitleValid = z.intersection(TitleMaxValid, TitleMinValid);
const DescriptionMaxValid = z.string().max(140);
const DescriptionMinValid = z.string().min(1);
const DescriptionValid = z.intersection(
  DescriptionMinValid,
  DescriptionMaxValid,
);
const TypeValid = z.string().min(1);
const DateValid = z.string();
const TimeStringValid = z.string().min(2);
const TimeValid = z.object({
  start_time: z.string(),
  end_time: z.string(),
});

const ImageValid = z.instanceof(File).nullable();

export const FormValid = z.object({
  title: TitleValid,
  description: DescriptionValid,
  type: TypeValid,
  date: DateValid,
  time: TimeValid,
  image: ImageValid,
});

function CreateMeetingForm(): ReactElement {
  const [form, setForm] = useState<z.infer<typeof FormValid>>({
    title: '',
    description: '',
    type: '',
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

  const isValid = useMemo(() => {
    try {
      FormValid.parse(form);
      return true;
    } catch (e) {
      return false;
    }
  }, [form]);

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
      replace(`/meetings/${result.data?.id}?created=banner`);
    else replace(`/meetings/${result.data?.id}?created=others`);
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

  useEffect(() => {
    logEvent(analytics, 'create_meeting__show', {
      from: refParams || '',
    });
  }, [refParams]);

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
        <TitleText>?????? ??????</TitleText>
        <TitleInput
          className="body3"
          placeholder="?????? ????????? ??????????????????. (???. ?????? ??? ?????? ?????? ?????????.)"
          height="8.6rem"
          validation={
            (submitState.state !== 'submit' &&
              TitleMaxValid.safeParse(form.title).success) ||
            (submitState.state === 'submit' &&
              TitleValid.safeParse(form.title).success)
          }
          formHandler={(value: string) =>
            setForm(prevState => ({ ...prevState, title: value }))
          }
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            {!TitleMaxValid.safeParse(form.title).success && (
              <div>?????? ????????? ?????? 40????????? ????????? ??? ?????????.</div>
            )}
            {submitState.state === 'submit' &&
              !TitleMinValid.safeParse(form.title).success && (
                <div>?????? ????????? ??????????????????.</div>
              )}
          </ValidationInfo>
          <WordCounter maxWords={40} words={form.title} />
        </ValidationInfoWarpper>
      </Title>
      <Description>
        <TitleText>?????? ??????</TitleText>
        <DescriptionInput
          placeholder="?????? ????????? ????????? ????????? ???????????? ??? ?????? ????????? ??? ?????????."
          height="15.5rem"
          validation={
            (submitState.state !== 'submit' &&
              DescriptionMaxValid.safeParse(form.description).success) ||
            (submitState.state === 'submit' &&
              DescriptionValid.safeParse(form.description).success)
          }
          formHandler={(value: string) =>
            setForm(prevState => ({ ...prevState, description: value }))
          }
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            {!DescriptionMaxValid.safeParse(form.description).success && (
              <div>'?????? ????????? ?????? 140????????? ????????? ??? ?????????.'</div>
            )}
            {submitState.state === 'submit' &&
              !DescriptionMinValid.safeParse(form.description).success && (
                <div>'?????? ????????? ??????????????????.'</div>
              )}
          </ValidationInfo>
          <WordCounter maxWords={140} words={form.description} />
        </ValidationInfoWarpper>
      </Description>

      <MeetingTypeWrapper>
        <TitleText>?????? ?????? ??????</TitleText>
        {submitState.state === 'submit' &&
          !TypeValid.safeParse(form.type).success && (
            <ValidationInfoWarpper>
              <ValidationInfo>
                <div>?????? ?????? ????????? ??????????????????.</div>
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
                <TypeName>????????????</TypeName>
              </TypeHeader>
              <TypeInfo>
                ??????????????? ??????????????? ???????????? ???????????????. ?????? ????????? ????????????
                ????????????.
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
                <TypeName>????????????</TypeName>
              </TypeHeader>
              <TypeInfo>
                ??????????????? ???(zoom) ????????? ???????????? ????????????. ??? ?????????
                ??????????????? ??? ????????? ??? ?????????.
              </TypeInfo>
            </TypeContentWrapper>
          </TypeBtn>
        </TypeBtnWrapper>
      </MeetingTypeWrapper>
      <Divider size="1.2rem" />
      <Date>
        <TitleText>?????? ??????</TitleText>
        <GreenInfoText>
          ?????? ????????? ????????? ????????? ????????? ??? ?????????.
        </GreenInfoText>
        <DatePicker
          submitState={submitState}
          onChange={(value: string) =>
            setForm(prevState => ({ ...prevState, date: value }))
          }
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            {submitState.state === 'submit' &&
              !TypeValid.safeParse(form.date).success && (
                <div>'?????? ????????? ??????????????????.'</div>
              )}
          </ValidationInfo>
        </ValidationInfoWarpper>
      </Date>
      <Time>
        <TitleText>?????? ??????</TitleText>
        <TimePicker
          date={form.date}
          time={form.time}
          setForm={setForm}
          trySubmit={submitState.state === 'submit'}
        />
        <ValidationInfoWarpper>
          <ValidationInfo>
            {submitState.state === 'submit' &&
              !TimeStringValid.safeParse(form.time.start_time).success && (
                <div>'?????? ?????? ????????? ??????????????????.'</div>
              )}
            {submitState.state === 'submit' &&
              !TimeStringValid.safeParse(form.time.end_time).success && (
                <div>'?????? ?????? ????????? ??????????????????.'</div>
              )}
          </ValidationInfo>
        </ValidationInfoWarpper>
      </Time>
      <SubmitArea>
        <ValidationInfoWarpper>
          <ValidationInfo>
            <SubmitValidation>
              {submitState.state === 'submit' &&
                !isValid &&
                '?????? ????????? ???????????? ??????????????????'}
            </SubmitValidation>
          </ValidationInfo>
        </ValidationInfoWarpper>
        <SubmitBtn
          onClick={() =>
            submitState.state !== 'loading' && loginWithMini(onSubmitBtnHandler)
          }
        >
          ?????? ?????????
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
