import React from 'react';

import styled from '@emotion/styled';
import { AgoraUserType } from 'meeting-v2';

type Props = { users: AgoraUserType[] };

function EnteredUserList({ users }: Props) {
  const firstUser = users[0];
  const usersNum = users.length;
  return (
    <Wrapper>
      <Profiles users={users} />
      <JoinUserText>
        {firstUser.nickname}
        {usersNum > 1 && ` 외 ${usersNum - 1}명`}
      </JoinUserText>
    </Wrapper>
  );
}

const MAXIMUN_PROFILE_NUM = 3; //프로필 표시 최대 인원

function Profiles({ users }: Props) {
  return (
    <ProfilesWrapper>
      {users.slice(0, MAXIMUN_PROFILE_NUM).map((user, idx) => (
        <ProfilesImage key={idx} src={user.profile_image_url} idx={idx} />
      ))}
    </ProfilesWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfilesWrapper = styled.div``;
const ProfilesImage = styled.img<{ idx: number }>`
  width: 1.8rem;
  height: 1.8rem;
  position: relative;
  left: ${({ idx }) => (idx === 0 ? 0 : `-${0.15 * idx}rem`)};
  z-index: ${({ idx }) => idx};
  border-radius: 50%;
`;

const JoinUserText = styled.div`
  margin-left: 0.6rem;

  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.02rem;
  color: ${({ theme }) => theme.colors.$gray600};
`;

export default EnteredUserList;
