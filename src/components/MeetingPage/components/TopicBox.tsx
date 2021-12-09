import React, { ReactElement, useRef, useState } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import bulb_off from '../../../assets/icon/agora/bulb_off.svg';
import bulb_on from '../../../assets/icon/agora/bulb_on.svg';
import useInterval from '../../../hook/useInterval';

interface Props {
  subTopic: string[];
}

function TopicBox({ subTopic }: Props): ReactElement {
  const [topicIdx, setTopicIdx] = useState(
    new Date().getMinutes() % subTopic.length,
  );
  const [bulbState, setBulbState] = useState(false);

  const bulbRef = useRef<HTMLImageElement>(null);

  const changeTopicHandler = () => {
    setTimeout(() => {
      setBulbState(false);
      bulbRef.current?.classList.remove('show');
    }, 1500);
  };

  useInterval(() => {
    const now = new Date();
    if (now.getSeconds() === 0) {
      setBulbState(true);
      bulbRef.current?.classList.add('show');
      setTopicIdx(now.getMinutes() % subTopic.length);
      changeTopicHandler();
    }
  }, 1000);
  return (
    <NoticeTopicWrapper topicIdx={topicIdx}>
      <EmojiWrapper src={bulbState ? bulb_on : bulb_off} ref={bulbRef} />
      <Message>{subTopic[topicIdx]}</Message>
    </NoticeTopicWrapper>
  );
}

const changeNotice = keyframes`
  10%  {
    transform: translate3d(-2px, 0, 0);
  }
  40%{
    transform: translate3d(2px, 0, 0);
  }
  70% {
    transform: translate3d(-2px, 0, 0);
  }
  100%{
    transform: translate3d(0, 0, 0);
  }
`;

const NoticeInnerWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: calc(100% - 4rem);
  margin: 0 2rem;
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 10;
`;

const NoticeTopicWrapper = styled(NoticeInnerWrapper)<{ topicIdx: number }>`
  background: #f5f5f5;
`;

const EmojiWrapper = styled.img`
  margin-right: 1rem;
  &.show {
    animation: ${changeNotice} 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97)
      forwards;
    transform: translate3d(0, 0, 0);
  }
`;

const Message = styled.div`
  font-size: 1.3rem;
  line-height: 2rem;
`;

export default TopicBox;
