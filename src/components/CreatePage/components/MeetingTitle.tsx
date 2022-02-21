import React from 'react';

import Spacing from '@components/Home/components/Spacing';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import WordCounter from './WordCounter';

const TITLE_MAX_LENGTH = 40;

function MeetingTitle() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const wordLength = watch('title')?.length ?? 0;

  return (
    <Title>
      <TitleText>제목</TitleText>
      <Spacing height="1.3rem" />
      <TitleInput
        className="body3"
        placeholder="이웃과 함께 하고 싶은 모임을 입력해주세요."
        height="8.6rem"
        validError={errors.title}
        {...register('title', { required: true, maxLength: TITLE_MAX_LENGTH })}
      />
      <ValidationInfoWarpper>
        <ValidationInfo>
          {errors.title && errors.title.type === 'required' && (
            <span role="alert">모임 제목을 입력해주세요.</span>
          )}
          {(wordLength > TITLE_MAX_LENGTH ||
            (errors.title && errors.title.type === 'maxLength')) && (
            <span role="alert">제목은 최대 40자까지 입력할 수 있어요.</span>
          )}
        </ValidationInfo>
        <WordCounter maxWords={40} words={wordLength} />
      </ValidationInfoWarpper>
    </Title>
  );
}

const titleTextStyle = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04rem;
  color: ${({ theme }) => theme.colors.$gray900};
`;

const TitleText = styled(titleTextStyle)`
  color: ${({ theme }) => theme.colors.$gray900};
`;

const Title = styled.div`
  width: auto;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input<{ validError: boolean }>`
  padding: 1.4rem 1.6rem;
  font-size: 1.6rem;
  line-height: 2rem;

  display: flex;
  align-items: center;
  letter-spacing: -0.02rem;
  color: ${({ theme }) => theme.colors.$gray900};
  border: 1px solid
    ${({ theme, validError }) =>
      validError ? '#ff5638' : theme.colors.$gray600};
  box-sizing: border-box;
  border-radius: 5px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.$gray500};
  }
`;

const ValidationInfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ValidationInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.03rem;
  color: #ff5638;
`;

export default MeetingTitle;
