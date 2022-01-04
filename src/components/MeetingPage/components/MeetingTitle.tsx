import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../../style/color';

interface Props {
  title: string;
}

function MeetingTitle({ title }: Props): ReactElement {
  return <TitleWrapper>{title}</TitleWrapper>;
}

const TitleWrapper = styled.div`
  margin: 1.76rem 2rem 1.4rem 2rem;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.5rem;
  letter-spacing: -0.05rem;
  color: ${COLOR.TEXT_BLACK};
`;

export default MeetingTitle;
