import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../../../constant/color';

interface Props {
  title: string;
  subTitle: string;
  emoji: `*.svg`;
}

function GuideDescription({ title, subTitle, emoji }: Props): ReactElement {
  return (
    <DescriptionWrapper>
      <TitleWrapper>
        <Emoji src={emoji} />
        <Title>{title}</Title>
      </TitleWrapper>

      <Discription>{subTitle}</Discription>
    </DescriptionWrapper>
  );
}

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.2rem;
`;

// const InfoWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const Emoji = styled.img`
  margin-right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.2rem;
`;

const Discription = styled.div`
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${COLOR.TEXT_GRAY};
  margin-left: 3.4rem;
  margin-bottom: 2.6rem;
`;

export default GuideDescription;
