import React from 'react';

import styled from '@emotion/styled';

type Props = { remainTime: { hours: number; minutes: number } };

function ReaminTimeNotice({ remainTime }: Props) {
  const isRemainUnder1Min =
    remainTime.hours === 0 &&
    remainTime.minutes <= 10 &&
    remainTime.minutes < 1;

  return (
    <NoticeWrapper>
      {isRemainUnder1Min
        ? `1분 내에 모임이 종료돼요.`
        : `${remainTime.minutes}분 뒤에 모임이 종료돼요.`}
    </NoticeWrapper>
  );
}

const NoticeWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: calc(100% - 4rem);
  margin: 0 2rem;
  padding: 1.4rem 1.6rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 10;
  background: #fff3f2;

  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.02rem;

  color: ${({ theme }) => theme.colors.$red800};
`;

export default ReaminTimeNotice;
