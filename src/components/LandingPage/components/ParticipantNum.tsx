import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import person from '../../../assets/icon/common/person.svg';
import { COLOR } from '../../../constant/color';

interface Props {
  userMeetingNum: number;
}

function ParticipantNum({ userMeetingNum }: Props): ReactElement {
  return (
    <ParticipantNumWrapper>
      <ParticipantIcon src={person} />
      <Participant>누적 참여자 {userMeetingNum}명</Participant>
    </ParticipantNumWrapper>
  );
}

const ParticipantNumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.4rem;
`;

const ParticipantIcon = styled.img`
  margin-right: 0.6rem;
`;

const Participant = styled.div`
  font-size: 1.3rem;
  line-height: 2rem;
  color: ${COLOR.FONT_BODY_GREY};
`;

export default ParticipantNum;
