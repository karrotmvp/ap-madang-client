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
      <Title>{MEETING_DETAIL.MANNER_CARD.TITLE}</Title>
      <Item>
        <Emoji src={heart_emoji} />
        <ItemTitle>{MEETING_DETAIL.MANNER_CARD.SUB_TITLE[0]}</ItemTitle>
      </Item>
      <Item>
        <Emoji src={talk_emoji} />
        <ItemTitle>{MEETING_DETAIL.MANNER_CARD.SUB_TITLE[1]}</ItemTitle>
      </Item>
      <Item>
        <Emoji src={x_emoji} />
        <ItemTitle>{MEETING_DETAIL.MANNER_CARD.SUB_TITLE[2]}</ItemTitle>
      </Item>
      <Item>
        <Emoji src={mic_emoji} />
        <ItemTitle>{MEETING_DETAIL.MANNER_CARD.SUB_TITLE[3]}</ItemTitle>
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
  margin-bottom: 1.3rem;
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
  margin-right: 0.8rem;
  width: 2.4rem;
  height: 2.4rem;
`;

export default MeetingMannerCard;
