import React, { useCallback } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { MeetingList as MeetingListType } from 'meeting-v2';

import { analytics } from '../../../../App';
import useMeetingDetail from '../../hook/useMeetingDetail';
import Spacing from '../Spacing';
import EnteredUserList from './EnteredUserList';
import RemainTimer from './RemainTimer';
import TagWrapper from './Tag';
import TitleWrapper from './Title';
import HostProfile from './UserProfile';

function MeetingCard({
  id,
  is_video,
  title,
  host,
  agora_user_list,
  start_time,
  end_time,
  date,
}: MeetingListType) {
  const { openMeetingDetail } = useMeetingDetail();

  const onClickOpenMeetingHandler = useCallback(() => {
    logEvent(analytics, 'meeting_card__click');
    openMeetingDetail(id);
  }, [id, openMeetingDetail]);

  return (
    <CardWrapper onClick={onClickOpenMeetingHandler}>
      <CardHeader>
        <TagWrapper isVideo={is_video} />
        <Spacing width="0.6rem" />
        <RemainTimer start_time={start_time} end_time={end_time} date={date} />
      </CardHeader>

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

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default React.memo(MeetingCard);
