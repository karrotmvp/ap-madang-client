import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../constant/color';
import { meetingType } from '../../store/meeting';

interface Props {
  data: meetingType;
}

const MeetingCardWrapper = styled.div`
  box-sizing: border-box;
  margin: 1rem 0 1.6rem 0;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  background-color: ${COLOR.BACKGROUND_MEETING_CARD};
  border-radius: 0.6rem;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MeetingTime = styled.div`
  color: ${COLOR.TEXT_GRAY};
  font-size: 1.4rem;
  line-height: 1.7rem;
  letter-spacing: -0.03rem;
`;

interface MeetingTitleType {
  isLive: boolean;
}

const MeetingTitle = styled.div`
  margin: 1rem 5rem 2.2rem 0;
  color: ${COLOR.TEXT_BLACK};
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.02rem;
  margin-bottom: ${({ isLive }: MeetingTitleType) =>
    isLive ? '2.2rem' : '0.6rem'};
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FooterText = styled.div`
  font-size: 1.4rem;
  line-height: 1.7rem;
  letter-spacing: -0.02rem;
  color: ${COLOR.TEXT_GRAY};
`;

function MeetingCard({ data }: Props): ReactElement {
  return (
    <MeetingCardWrapper>
      <CardHeader>
        <MeetingTime>
          📡 {data.start_time} ~ {data.end_time}
        </MeetingTime>
        {/* TODO: 알림 설정 API 및 알림 상태 업데이트 */}
        <div style={{ fontSize: '30px' }}>🔔</div>
      </CardHeader>

      <MeetingTitle isLive={data.is_live}>{data.title}</MeetingTitle>
      {data.is_live && (
        <CardFooter>
          <FooterText>모임에 참여해 이야기를 나눠보세요</FooterText>
        </CardFooter>
      )}
    </MeetingCardWrapper>
  );
}

export default MeetingCard;
