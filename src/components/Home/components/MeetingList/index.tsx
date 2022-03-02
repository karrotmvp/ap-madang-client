import React from 'react';

import useGetMeetingList from '../../hook/useGetMeetingList';
import FinishMeetingList from './FinishMeetingList';
import LiveMeetingList from './LiveMeetingList';

function MeetingList() {
  const { liveMeetings, finishMeetings } = useGetMeetingList();

  return (
    <section>
      {liveMeetings && <LiveMeetingList meetings={liveMeetings} />}
      {finishMeetings && <FinishMeetingList meetings={finishMeetings} />}
    </section>
  );
}

export default React.memo(MeetingList);
