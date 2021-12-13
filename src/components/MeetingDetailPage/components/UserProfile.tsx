import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { HostInfo } from 'meeting';

import { COLOR } from '../../../constant/color';

interface Props {
  hostInfo: HostInfo;
}

function UserProfile({ hostInfo }: Props): ReactElement {
  return (
    <UserProfileWrapper>
      <ProfileImg src={hostInfo.profile_image_url} />
      <UserInfoWrapper>
        <UserName>{hostInfo.nickname}</UserName>
        <UserRegion>{hostInfo.region_name}</UserRegion>
      </UserInfoWrapper>
    </UserProfileWrapper>
  );
}

const UserProfileWrapper = styled.div`
  margin: 0 1.6rem 2rem 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.8rem;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 1.3rem;
  line-height: 1.6rem;
  margin-bottom: 0.2rem;
`;

const UserRegion = styled.div`
  font-size: 1.3rem;
  line-height: 1.6rem;
  color: ${COLOR.FONT_BODY_GREY};
`;

export default UserProfile;
