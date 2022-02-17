import React from 'react';

import styled from '@emotion/styled';
import { AgoraUserType } from 'meeting-v2';

type Props = { users: AgoraUserType[] };

function Profiles({ users }: Props) {
  return (
    <ProfilesWrapper>
      {users.slice(0, 3).map((user, idx) => (
        <ProfilesImage key={idx} src={user.profile_image_url} idx={idx} />
      ))}
    </ProfilesWrapper>
  );
}

function EnteredUserList({ users }: Props) {
  return (
    <Wrapper>
      <Profiles users={users} />
      <JoinUserText>
        {users.length === 1 ? users[0].nickname : users[0].nickname} 외{' '}
        {users.length - 1}명
      </JoinUserText>
    </Wrapper>
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
