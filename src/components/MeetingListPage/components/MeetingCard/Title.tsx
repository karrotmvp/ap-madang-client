import React from 'react';

import styled from '@emotion/styled';

type Props = { title: string };

function TitleWrapper({ title }: Props) {
  return <Title>{title}</Title>;
}

const Title = styled.h1`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
  letter-spacing: -0.04rem;
  color: ${({ theme }) => theme.colors.$gray900};
`;

export default TitleWrapper;
