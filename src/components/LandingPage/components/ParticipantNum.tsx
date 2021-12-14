import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import person_fill__grey from '../../../assets/icon/common/person_fill__grey.svg';
import { COLOR } from '../../../constant/color';

interface Props {
  userMeetingNum: number;
}

function ParticipantNum({ userMeetingNum }: Props): ReactElement {
  return (
    <ParticipantNumWrapper>
      <ParticipantIcon src={person_fill__grey} />
      <Participant>참여 이웃 {userMeetingNum}명</Participant>
    </ParticipantNumWrapper>
  );
}

const ParticipantNumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1.6rem;
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
