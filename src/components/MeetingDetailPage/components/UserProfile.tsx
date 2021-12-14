import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { HostInfo } from 'meeting';

import { COLOR } from '../../../constant/color';

interface Props {
  hostInfo: HostInfo;
  className?: string;
}

function UserProfile({ hostInfo, className }: Props): ReactElement {
  return (
    <UserProfileWrapper className={classnames(className, 'user-profile')}>
      {hostInfo.profile_image_url && (
        <ProfileImg src={hostInfo.profile_image_url} />
      )}
      <Text>{hostInfo.nickname}</Text>
      <DotDivider>·</DotDivider>
      <Text>{hostInfo.region_name}</Text>
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

  margin: 0 1.6rem 2rem 1.6rem;
`;

const ProfileImg = styled.img`
  width: 2.8rem;
  height: 2.8rem;
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
