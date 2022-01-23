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
  margin: 2.35rem 2rem 1.6rem 2rem;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.6rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_BLACK};
`;

export default MeetingTitle;
