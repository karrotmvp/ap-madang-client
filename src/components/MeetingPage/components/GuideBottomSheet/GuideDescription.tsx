import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import dot_icon from '../../../../assets/icon/agora/dot_icon.svg';
import { COLOR } from '../../../../style/color';

interface Props {
  title: string;
  subTitle: string;
}

function GuideDescription({ title, subTitle }: Props): ReactElement {
  return (
    <DescriptionWrapper>
      <TitleWrapper>
        <DotWrapper>
          <img src={dot_icon} />
        </DotWrapper>
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

const DotWrapper = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.2rem;
`;

const Discription = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${COLOR.TEXT_GREY};
  margin-left: 2.2rem;
  margin-bottom: 2.6rem;
`;

export default GuideDescription;
