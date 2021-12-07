import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import notification_off__grey from '../../../assets/icon/myPage/notification_off__grey.svg';
import { COLOR } from '../../../constant/color';

interface Props {
  alarmNum: number;
}

function AlarmNum({ alarmNum }: Props): ReactElement {
  return (
    <AlarmNumWrapper>
      <AlarmIcon src={notification_off__grey} />
      <AlarmText>{alarmNum}명 신청 중</AlarmText>
    </AlarmNumWrapper>
  );
}

const AlarmNumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AlarmIcon = styled.img`
  margin-right: 0.6rem;
`;

const AlarmText = styled.div`
  font-size: 1.3rem;
  line-height: 2rem;
  color: ${COLOR.FONT_BODY_GREY};
`;

export default AlarmNum;
