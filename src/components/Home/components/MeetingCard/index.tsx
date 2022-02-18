import React from 'react';

import styled from '@emotion/styled';
import { MeetingList as MeetingListType } from 'meeting-v2';

import useMeetingDetail from '../../hook/useMeetingDetail';
import EnteredUserList from './EnteredUserList';
import TagWrapper from './Tag';
import TitleWrapper from './Title';
import HostProfile from './UserProfile';

function MeetingCard({
  id,
  is_video,
  title,
  host,
  agora_user_list,
}: MeetingListType) {
  const { openMeetingDetail } = useMeetingDetail();

  return (
    <CardWrapper onClick={() => openMeetingDetail(id)}>
      <TagWrapper isVideo={is_video} />
      <Spacing size="0.4rem" />
      <TitleWrapper title={title} />
      <Spacing size="0.4rem" />
      <HostProfile nickname={host.nickname} regionName={host.region_name} />
      {agora_user_list.length !== 0 && (
        <>
          <Spacing size="2.4rem" />
          <EnteredUserList users={agora_user_list} />
        </>
      )}
    </CardWrapper>
  );
}

const CardWrapper = styled.article`
  padding: 1.6rem 0;
`;

const Spacing = styled.div<{ size: string }>`
  width: 100%;
  height: ${({ size = '1.6rem' }) => size};
`;

export default React.memo(MeetingCard);
