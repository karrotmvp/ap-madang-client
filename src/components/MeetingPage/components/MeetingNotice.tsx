import React, { ReactElement, useEffect, useState } from 'react';

import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

import welcome from '../../../assets/icon/agora/welcome.svg';
import TopicBox from './TopicBox';

interface Props {
  subTopic: string[];
  userNum: number;
}

function MeetingNotice({ subTopic, userNum }: Props): ReactElement {
  const [userNumState, setUserNumState] = useState(0);
  const [newUserState, setNewUserState] = useState(false);

  const newUserStateChanger = () => {
    setTimeout(() => {
      setNewUserState(false);
    }, 5000);
  };

  useEffect(() => {
    if (userNumState < userNum) {
      setUserNumState(userNum);
      setNewUserState(true);
      newUserStateChanger();
    } else setUserNumState(userNum);
  }, [userNum, userNumState]);

  return (
    <NoticeOuterWrapper>
      {newUserState ? (
        <NoticeNewUserWrapper>
          <EmojiWrapper src={welcome} />
          <Message>새로운 이웃이 참여했어요! 환영해 주세요 🎉</Message>
        </NoticeNewUserWrapper>
      ) : (
        subTopic.length !== 0 && <TopicBox subTopic={subTopic} />
      )}
    </NoticeOuterWrapper>
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

const NoticeOuterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
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

const NoticeNewUserWrapper = styled(NoticeInnerWrapper)`
  background: #ecf9f2;
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

export default MeetingNotice;
