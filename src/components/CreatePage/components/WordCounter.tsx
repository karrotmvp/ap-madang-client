import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

interface Props {
  maxWords: number;
  words: number;
}

function WordCounter({ maxWords, words }: Props): ReactElement {
  return (
    <WordCounterWrapper>
      <CurrentWord>{words}</CurrentWord>/{maxWords}
    </WordCounterWrapper>
  );
}

const WordCounterWrapper = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.02rem;

  color: ${({ theme }) => theme.colors.$gray600};
`;

const CurrentWord = styled.span`
  color: ${({ theme }) => theme.colors.$carrot500};
`;

export default React.memo(WordCounter);
