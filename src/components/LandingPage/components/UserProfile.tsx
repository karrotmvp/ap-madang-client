import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../../constant/color';

interface Props {
  profileUrl: string;
  nickname: string;
  region: string;
}

function UserProfile({ profileUrl, nickname, region }: Props): ReactElement {
  return (
    <UserProfileWrapper>
      <ProfileImg src={profileUrl} />
      <Text>{nickname}</Text>
      <DotDivider>·</DotDivider>
      <Text>{region}</Text>
    </UserProfileWrapper>
  );
}

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
`;
const Text = styled.div`
  font-size: 1.3rem;
  line-height: 2rem;
  color: ${COLOR.TEXT_GREY};
`;
const DotDivider = styled.div`
  margin: 0 0.4rem;
`;
export default UserProfile;
