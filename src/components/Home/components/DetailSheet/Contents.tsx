import React from 'react';

import styled from '@emotion/styled';
import { meetingDetailSelector } from '@store/meeting';
import { MeetingList } from 'meeting-v2';
import { useRecoilValue } from 'recoil';

import EnteredUserList from '../MeetingCard/EnteredUserList';
import TitleWrapper from '../MeetingCard/Title';
import HostProfile from '../MeetingCard/UserProfile';
import Spacing from '../Spacing';

function Contents() {
  const meetingDetail = useRecoilValue(meetingDetailSelector);
  const { title, host, agora_user_list, description_text } =
    meetingDetail as MeetingList;

  return (
    <Wrapper>
      <Spacing height="0.4rem" />
      <TitleWrapper title={title} />
      <Spacing height="0.4rem" />
      <HostProfile nickname={host.nickname} regionName={host.region_name} />
      {agora_user_list.length !== 0 && (
        <>
          <Spacing height="2.4rem" />
          <EnteredUserList users={agora_user_list} />
        </>
      )}
      {description_text && (
        <>
          <Spacing height="1.2rem" />
          <DescriptionWrapper>{description_text}</DescriptionWrapper>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const DescriptionWrapper = styled.div`
  padding: 1rem 0.8rem;

  background: ${({ theme }) => theme.colors.$gray100};
  border-radius: 1.2rem;

  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.02rem;
  color: ${({ theme }) => theme.colors.$gray900};
`;

export default Contents;
