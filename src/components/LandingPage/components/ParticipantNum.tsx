import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import person from '../../../assets/icon/person.svg';
import { COLOR } from '../../../constant/color';

interface Props {
  userMeetingNum: number;
}

function ParticipantNum({ userMeetingNum }: Props): ReactElement {
  return (
    <ParticipantNumWrapper>
      <ParticipantIcon src={person} />
      <Participant className="body4">
        누적 참여자 {userMeetingNum}명
      </Participant>
    </ParticipantNumWrapper>
  );
}

const ParticipantNumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

const ParticipantIcon = styled.img`
  margin-right: 0.4rem;
`;

const Participant = styled.div`
  color: ${COLOR.TEXT_GREY};
`;

export default ParticipantNum;
