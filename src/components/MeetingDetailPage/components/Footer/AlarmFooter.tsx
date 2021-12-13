import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useCurrentScreen } from '@karrotframe/navigator';
import { MeetingDetail } from 'meeting';

import fire_emoji from '../../../../assets/icon/detailPage/fire_emoji.svg';
import notification_empty_green from '../../../../assets/icon/detailPage/notification_empty_green.svg';
import notification_fill_white from '../../../../assets/icon/detailPage/notification_fill_white.svg';
import smile_emoji from '../../../../assets/icon/detailPage/smile_emoji.svg';
import { COLOR } from '../../../../constant/color';
import useMini from '../../../../hook/useMini';

interface Props {
  data: MeetingDetail | undefined;
  alarmHandler: () => void;
  fromFeed: boolean;
}

function AlarmFooter({ data, alarmHandler }: Props): ReactElement {
  const { loginWithMini } = useMini();
  const { isRoot } = useCurrentScreen();

  return (
    <FooterWrapper className="meeting-detail__footer-nav-bar">
      {data?.live_status !== 'live' && isRoot && (
        <MessageBubble>
          <BubbleIcon src={data?.alarm_id ? smile_emoji : fire_emoji} />
          {data?.alarm_id
            ? '모임이 시작되면 알림을 보내드릴게요'
            : '알림 신청하고 랜동모에서 이웃을 만나보세요!'}
        </MessageBubble>
      )}
      <Footer fromFeed={data?.live_status !== 'live' && isRoot}>
        {/* TODO: add fromFeed Event */}
        <AlarmBtn
          applied={data?.alarm_id}
          onClick={e => {
            e.stopPropagation();
            loginWithMini(alarmHandler);
          }}
        >
          <img
            src={
              data?.alarm_id
                ? notification_empty_green
                : notification_fill_white
            }
          />

          <AlarmApplicant applied={data?.alarm_id}>
            {data?.alarm_id ? '알림 받는 중' : '알림 신청'}
            <Count>{data?.alarm_num || 0}명 신청 중</Count>
          </AlarmApplicant>
        </AlarmBtn>
      </Footer>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  max-height: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const MessageBubble = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: calc(100% - 3.2rem);
  margin-bottom: 0.2rem;
  position: relative;
  background: ${COLOR.GREY_900};
  border-radius: 0.6em;

  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  letter-spacing: -0.03rem;
  padding: 1rem 1.4rem;
  color: #ffffff;
  box-sizing: border-box;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 0.7rem solid transparent;
    border-top-color: ${COLOR.GREY_900};
    border-bottom: 0;
    margin-left: -0.7rem;
    margin-bottom: -0.7rem;
  }
`;

const BubbleIcon = styled.img`
  margin-right: 0.6rem;
`;

const Footer = styled.div<{ fromFeed: boolean }>`
  width: 100%;
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${COLOR.BACKGROUND_WHITE};
  border-top: ${({ fromFeed }) =>
    fromFeed ? 'none' : `1px solid ${COLOR.NAVBAR_TOP_BORDER}`};
`;

const AlarmBtn = styled.div<{ applied: number | undefined }>`
  width: 100%;
  margin: 1rem 1.6rem;
  height: 4.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  border: 0.1rem solid ${COLOR.LIGHT_GREEN};
  background: ${({ applied }) =>
    applied ? COLOR.TEXT_WHITE : COLOR.LIGHT_GREEN};
`;

const AlarmApplicant = styled.div<{ applied: number | undefined }>`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9rem;
  text-align: center;
  letter-spacing: -0.03rem;
  margin-left: 0.4rem;
  color: ${({ applied }) => (applied ? COLOR.LIGHT_GREEN : COLOR.TEXT_WHITE)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Count = styled.div`
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 2rem;
  text-align: center;
  letter-spacing: -0.03rem;
  margin-left: 0.6rem;
`;

export default AlarmFooter;
