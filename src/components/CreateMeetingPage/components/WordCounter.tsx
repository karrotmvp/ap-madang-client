import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../../constant/color';

interface Props {
  maxWords: number;
  words: string;
}

function WordCounter({ maxWords, words }: Props): ReactElement {
  return (
    <WordCounterWrapper>
      {words.length}/{maxWords}자
    </WordCounterWrapper>
  );
}

const WordCounterWrapper = styled.div`
  margin-right: 1.6rem;
  font-size: 1.3rem;
  line-height: 1.6rem;
  /* identical to box height */

  text-align: right;
  letter-spacing: -0.03rem;

  color: ${COLOR.GREY_500};
`;

export default React.memo(WordCounter);
