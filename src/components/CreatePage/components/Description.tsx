import React from 'react';

import Spacing from '@components/Home/components/Spacing';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import WordCounter from './WordCounter';

// type Props = {};

const DESCRIPTION_MAX_LENGTH = 140;

function Description() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const wordLength = watch('description')?.length ?? 0;
  const validError = wordLength > DESCRIPTION_MAX_LENGTH || errors.description;

  return (
    <Wrapper>
      <TitleText>
        상세 내용 <SubTitle>(선택)</SubTitle>
      </TitleText>
      <Spacing height="1.3rem" />
      <TextreaWrapper>
        <Textarea
          validError={validError}
          placeholder="모임 내용을 자세히 적으면 이웃들이 더 쉽게 참여할 수 있어요."
          {...register('description', { maxLength: 140 })}
        />
        <WordCounterWrapper>
          <WordCounter maxWords={DESCRIPTION_MAX_LENGTH} words={wordLength} />
        </WordCounterWrapper>
      </TextreaWrapper>

      <ValidationInfoWarpper>
        <ValidationInfo>
          {validError && (
            <span role="alert">
              모임 내용은 최대 140자까지 입력할 수 있어요.
            </span>
          )}
        </ValidationInfo>
      </ValidationInfoWarpper>
    </Wrapper>
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

const SubTitle = styled.span`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04rem;
  color: ${({ theme }) => theme.colors.$gray600};
`;

const Wrapper = styled.div``;

const TextreaWrapper = styled.div`
  position: relative;
`;

const Textarea = styled.textarea<{ validError: boolean }>`
  width: 100%;
  padding: 1.2rem 1.6rem 2.7rem 1.6rem;
  height: 17.2rem;

  box-sizing: border-box;
  border: 1px solid
    ${({ theme, validError }) =>
      validError ? '#ff5638' : theme.colors.$gray600};
  border-radius: 0.6rem;
  resize: none;

  font-size: 1.6rem;
  line-height: 2.2rem;

  letter-spacing: -0.02rem;

  // safari shadow 제거
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.$gray500};
  }
`;

const WordCounterWrapper = styled.div`
  position: absolute;
  bottom: 1.3rem;
  right: 1.2rem;

  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: -0.04rem;
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

export default Description;
