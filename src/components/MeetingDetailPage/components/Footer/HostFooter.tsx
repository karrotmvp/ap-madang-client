import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { MeetingDetail } from 'meeting';

import { COLOR } from '../../../../constant/color';
import { MEETING_DETAIL } from '../../../../constant/message';

interface Props {
  data: MeetingDetail | undefined;
}

function HostFooter({ data }: Props): ReactElement {
  return (
    <FooterWrapper className="meeting-detail__footer-nav-bar">
      <AlarmBtn applied={data?.alarm_id}>
        <AlarmApplicant applied={data?.alarm_id}>
          {MEETING_DETAIL.HOST_FOOTER_MESSAGE}
          <Count>{data?.alarm_num || 0}명 신청 중</Count>
        </AlarmApplicant>
      </AlarmBtn>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

const AlarmBtn = styled.div<{ applied: number | undefined }>`
  width: 100%;
  margin: 1rem 1.6rem;
  height: 4.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  border: 0.1rem solid ${COLOR.LIGHT_GREEN};
  background: ${({ applied }) =>
    applied ? COLOR.LIGHT_GREEN : COLOR.TEXT_WHITE};
`;

const AlarmApplicant = styled.div<{ applied: number | undefined }>`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9rem;
  text-align: center;
  letter-spacing: -0.03rem;
  margin-left: 0.4rem;
  color: ${({ applied }) => (applied ? COLOR.TEXT_WHITE : COLOR.LIGHT_GREEN)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Count = styled.div`
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 2rem;
  text-align: center;
  letter-spacing: -0.03rem;
  margin-left: 0.6rem;
`;

export default HostFooter;
