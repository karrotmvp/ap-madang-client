import React, { ReactElement, useCallback, useMemo } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';

import { COLOR } from '../../constant/color';
import { CREATE_MEETING } from '../../constant/message';
import { createMeetingAtom } from '../../store/meeting';
import MiddleScreenHelmet from '../common/MiddleScreenHelmet';
import EditableTextarea from './components/EditableTextarea';
import WordCounter from './components/WordCounter';

function CreateForm1(): ReactElement {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [type, setType] = React.useState<undefined | 'video' | 'audio'>(
    undefined,
  );
  const setCreateMeetingState = useSetRecoilState(createMeetingAtom);
  const { push } = useNavigator();

  const isValid = useMemo(
    () =>
      title.length !== 0 &&
      title.length <= 40 &&
      description.length !== 0 &&
      description.length <= 140 &&
      type !== undefined,
    [description.length, title.length, type],
  );

  const onNextBtnHandler = useCallback(() => {
    if (!isValid) return;

    setCreateMeetingState({
      title: title,
      description: { text: description },
      is_video: type === 'video',
    });
    push('/create/form2');
  }, [description, isValid, push, setCreateMeetingState, title, type]);

  return (
    <CreateMeeting>
      <MiddleScreenHelmet
        appendMiddle={<PageTitle>{CREATE_MEETING.NAVIGATOR_TITLE_1}</PageTitle>}
        appendRight={
          <NextPageBtn valid={isValid} onClick={onNextBtnHandler}>
            다음
          </NextPageBtn>
        }
      />
      <Title>
        <TitleText>모임 제목</TitleText>
        <TitleInput
          className="body3"
          placeholder="모임 제목을 입력해주세요. (예. 같이 책 읽고 대화 나눠요.)"
          height="8.6rem"
          formHandler={setTitle}
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
      <MeetingTypeWrapper>
        <TitleText>모임 진행 방식</TitleText>
        <GreenInfoText>
          원하는 모임 진행 방식을 선택하면 모임 링크가 자동으로 생성돼요.
        </GreenInfoText>
        <TypeBtnWrapper>
          <TypeBtn selected={type === 'audio'} onClick={() => setType('audio')}>
            음성모임
          </TypeBtn>
          <TypeBtn selected={type === 'video'} onClick={() => setType('video')}>
            화상모임
          </TypeBtn>
        </TypeBtnWrapper>
      </MeetingTypeWrapper>
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

const GreenInfoText = styled.div`
  font-size: 1.3rem;
  line-height: 1.8rem;
  letter-spacing: -0.03rem;
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

const TypeBtn = styled.div<{ selected: boolean }>`
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
    return selected ? COLOR.TEXT_WHITE : COLOR.GREY_500;
  }};
  background: ${({ selected }) => {
    return selected ? COLOR.LIGHT_GREEN : COLOR.TEXT_WHITE;
  }};
`;

export default CreateForm1;
