import React from 'react';

import styled from '@emotion/styled';

function CloseMeetingTag() {
  return <Tag>모임종료</Tag>;
}

const Tag = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.04rem;
  color: ${({ theme }) => theme.colors.$gray600};
  margin-right: 0.4rem;
`;

export default CloseMeetingTag;
