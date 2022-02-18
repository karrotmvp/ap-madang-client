import React from 'react';

import styled from '@emotion/styled';
import { MeetingList as MeetingListType } from 'meeting-v2';

import useMeetingDetail from '../../hook/useMeetingDetail';
import Spacing from '../Spacing';
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
    </CardWrapper>
  );
}

const CardWrapper = styled.article`
  padding: 1.6rem 0;
`;

export default React.memo(MeetingCard);
