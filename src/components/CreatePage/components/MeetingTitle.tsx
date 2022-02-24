import React from 'react';

import Spacing from '@components/Home/components/Spacing';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import ValidError from './ValidError';
import WordCounter from './WordCounter';

const TITLE_MAX_LENGTH = 40;

function MeetingTitle() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const wordLength = watch('title')?.length ?? 0;
  const requiredError = errors.title && errors.title.type === 'required';
  const maxLengthError =
    wordLength > TITLE_MAX_LENGTH ||
    (errors.title && errors.title.type === 'maxLength');

  return (
    <Title>
      <TitleText>제목</TitleText>
      <Spacing height="1.3rem" />
      <TitleInput
        className="body3"
        placeholder="이웃과 함께 하고 싶은 모임을 입력해주세요."
        height="8.6rem"
        validError={requiredError || maxLengthError}
        {...register('title', { required: true, maxLength: TITLE_MAX_LENGTH })}
      />
      <Spacing height="0.8rem" />
      <SubInfoWrapper>
        <ValidationInfoWarpper>
          {requiredError && <ValidError message="모임 제목을 입력해주세요." />}
          {maxLengthError && (
            <ValidError message="제목은 최대 40자까지 입력할 수 있어요." />
          )}
        </ValidationInfoWarpper>
        <WordCounter maxWords={40} words={wordLength} />
      </SubInfoWrapper>
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
      validError ? '#E81300' : theme.colors.$gray400};
  box-sizing: border-box;
  border-radius: 5px;

  // safari shadow 제거
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.$gray500};
  }

  &:focus {
    outline: none !important;
    border: 1px solid
      ${({ theme, validError }) =>
        validError ? '#E81300' : theme.colors.$gray900};
  }
`;
const SubInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ValidationInfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default MeetingTitle;
