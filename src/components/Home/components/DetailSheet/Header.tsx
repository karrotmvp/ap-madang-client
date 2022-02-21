import React from 'react';

import { closeMeeting } from '@api/v2/meeting';
import styled from '@emotion/styled';
import { meetingDetailSelector } from '@store/meeting';
import { MeetingList } from 'meeting-v2';
import { useRecoilValue } from 'recoil';

import Tag from '../MeetingCard/Tag';

type Props = {
  is_video: boolean;
  closeHandler: () => void;
};

function Header({ is_video, closeHandler }: Props) {
  const detailMeeting = useRecoilValue(meetingDetailSelector) as MeetingList;

  const closeMeetingHandler = async () => {
    const result = await closeMeeting(detailMeeting.id.toString());
    if (result.success) closeHandler();
  };

  return (
    <Wrapper>
      <Tag isVideo={is_video} />
      {detailMeeting.is_host && (
        <CloseMeetingButton onClick={closeMeetingHandler}>
          모임 종료
        </CloseMeetingButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CloseMeetingButton = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.02rem;

  /* Scale/Red/Red950 */
  // TODO: 색상 theme 추가
  color: #b61709;
`;

export default Header;
