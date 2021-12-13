import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import classnames from 'classnames';

import plus__white from '../../../assets/icon/myPage/plus__white.svg';
import un_happy_scratch from '../../../assets/image/un_happy_scratch.png';
import { COLOR } from '../../../constant/color';

interface Props {
  className?: string;
}

function EmptyMeeting({ className }: Props): ReactElement {
  const { push } = useNavigator();

  return (
    <CurrMeetingListWrapper
      className={classnames('empty-meeting-list', className)}
    >
      <TitleWrapper>
        <Title>내가 만든 모임</Title>
      </TitleWrapper>
      <EmptyWrapper>
        <EmptyImg src={un_happy_scratch} />
        <EmptyText>
          {'아직 만든 모임이 없어요.\n모임을 만들고 이웃을 만나보세요.'}
        </EmptyText>
        <CreateBtn>
          <img src={plus__white} />
          <CreateBtnText onClick={() => push('/create')}>
            모임 만들기
          </CreateBtnText>
        </CreateBtn>
      </EmptyWrapper>
    </CurrMeetingListWrapper>
  );
}

const CurrMeetingListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 3.2rem 1.6rem 5rem 1.6rem;

  .swiper {
    width: 100%;
  }

  .swiper-wrapper {
    box-sizing: border-box;
  }

  .swiper-slide {
    width: auto;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 6.1rem;
`;

const Title = styled.div`
  font-weight: 700;
  padding-left: 0.4rem;

  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: -0.05rem;
  color: ${COLOR.TEXT_BLACK};
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyImg = styled.img`
  width: 8rem;
  margin-bottom: 1.9rem;
`;

const EmptyText = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.03rem;

  color: ${COLOR.TEXT_GREY};
  margin-bottom: 2.4rem;
`;

const CreateBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 1.2rem 2rem;
  border-radius: 2.5rem;
  background: ${COLOR.LIGHT_GREEN};
`;

const CreateBtnText = styled.div`
  font-size: 1.5rem;
  line-height: 2.2rem;
  margin-left: 0.6rem;

  text-align: center;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_WHITE};
`;
export default EmptyMeeting;
