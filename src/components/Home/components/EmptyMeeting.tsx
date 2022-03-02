import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import plus_icon from '../../../assets/icon/home/plus_icon.svg';
import Spacing from './Spacing';

interface Props {
  className?: string;
}

function EmptyMeeting({ className }: Props): ReactElement {
  const { push } = useNavigator();

  return (
    <EmptyWrapper className={className}>
      <EmptyText>
        {'현재 진행중인 모임이 없어요.\n지금 모임을 만들고 이웃을 만나보세요.'}
      </EmptyText>
      <Spacing height="1.6rem" />
      <CreateBtn onClick={() => push('/create')}>
        <img src={plus_icon} />
        <Spacing width="0.7rem" />
        <CreateBtnText>모임 만들기</CreateBtnText>
      </CreateBtn>
    </EmptyWrapper>
  );
}

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5.6rem 0;
`;

const EmptyText = styled.div`
  font-size: 1.6rem;
  line-height: 2.6rem;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02rem;

  color: ${({ theme }) => theme.colors.$gray600};
`;

const CreateBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 0.8rem 1.4rem;
  border-radius: 2.5rem;

  border: 1px solid #dcdee3;
  box-sizing: border-box;
  border-radius: 0.4rem;
`;

const CreateBtnText = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.02rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.$gray900};
`;
export default EmptyMeeting;
