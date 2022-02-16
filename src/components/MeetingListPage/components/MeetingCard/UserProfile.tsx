import React from 'react';

import styled from '@emotion/styled';

type Props = {
  nickname: string;
  regionName: string;
};

function UserProfile({ nickname, regionName }: Props) {
  return (
    <UserProfileWrapper>
      <span>{nickname}</span>
      <DotDivider>•</DotDivider>
      <span>{regionName}</span>
    </UserProfileWrapper>
  );
}

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: -0.04rem;

  color: ${({ theme }) => theme.colors.$gray600};
`;

const DotDivider = styled.div`
  margin: 0 0.4rem;
`;

export default UserProfile;
