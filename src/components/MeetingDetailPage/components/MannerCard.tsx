import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import heart_emoji from '../../../assets/icon/agora/heart_emoji.svg';
import mic_emoji from '../../../assets/icon/agora/mic_emoji.svg';
import talk_emoji from '../../../assets/icon/agora/talk_emoji.svg';
import x_emoji from '../../../assets/icon/agora/x_emoji.svg';
import { MEETING_DETAIL } from '../../../constant/message';

interface Props {
  className?: string;
}

function MeetingMannerCard({ className }: Props): ReactElement {
  return (
    <MeetingMannerCardWrapper className={className}>
      <Title>{MEETING_DETAIL.MANNER.TITLE}</Title>

      <Item>
        <Emoji src={heart_emoji} />
        <ItemTitle>서로 배려하고 존중해요.</ItemTitle>
      </Item>
      <Item>
        <Emoji src={talk_emoji} />
        <ItemTitle>이웃 모두가 함께 나눌 수 있는 대화를 해요.</ItemTitle>
      </Item>
      <Item>
        <Emoji src={x_emoji} />
        <ItemTitle>이웃을 공개적으로 비방하지 않아요.</ItemTitle>
      </Item>
      <Item>
        <Emoji src={mic_emoji} />
        <ItemTitle>마이크를 켜라고 강요하지 않기로 해요.</ItemTitle>
      </Item>
    </MeetingMannerCardWrapper>
  );
}

const MeetingMannerCardWrapper = styled.div`
  margin: 3.6rem 1.6rem 0 1.6rem;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: -0.04rem;
  margin-bottom: 2.4rem;
`;

const ItemTitle = styled.div`
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: #505050;
  margin-bottom: 1rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 1.5rem;
  line-height: 2.3rem;

  letter-spacing: -0.03rem;

  color: #505050;
`;

const Emoji = styled.img`
  margin-right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
`;

export default MeetingMannerCard;
