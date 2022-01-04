import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../../style/color';

interface Props {
  profileUrl?: string;
  nickname: string;
  region: string;
  className?: string;
}

function UserProfile({
  profileUrl,
  nickname,
  region,
  className,
}: Props): ReactElement {
  return (
    <UserProfileWrapper className={classnames(className, 'user-profile')}>
      {profileUrl && <ProfileImg src={profileUrl} />}
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

  font-size: 1.3rem;
  line-height: 2rem;
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
`;
const Text = styled.div`
  color: ${COLOR.TEXT_GREY};
`;
const DotDivider = styled.div`
  margin: 0 0.4rem;
`;
export default UserProfile;
