import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { MeetingDetail } from 'meeting';
import { useRecoilState, useSetRecoilState } from 'recoil';

import notification_empty_green from '../../../assets/icon/detailPage/notification_empty_green.svg';
import notification_fill_white from '../../../assets/icon/detailPage/notification_fill_white.svg';
import { COLOR } from '../../../constant/color';
import { codeAtom, userInfoAtom, UserInfoType } from '../../../store/user';
import { authHandler } from '../../../util/withMini';

interface Props {
  data: MeetingDetail | undefined;
  alarmHandler: (userInfo: UserInfoType) => (e?: React.MouseEvent) => void;
}

function AlarmFooter({ data, alarmHandler }: Props): ReactElement {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const setCode = useSetRecoilState(codeAtom);

  return (
    <FooterWrapper className="meeting-detail__footer-nav-bar">
      <AlarmBtn
        applied={data?.alarm_id}
        onClick={
          !userInfo
            ? authHandler(
                alarmHandler,
                setCode,
                setUserInfo,
                'detail_page_alaram',
              )
            : alarmHandler(userInfo)
        }
      >
        {data?.alarm_id ? (
          <img src={notification_fill_white} />
        ) : (
          <img src={notification_empty_green} />
        )}

        <AlarmApplicant applied={data?.alarm_id}>
          {/* {data?.alarm_num || 0} */}
          {data?.alarm_id ? '알림 받는 중' : '알림 신청하기'}
        </AlarmApplicant>
      </AlarmBtn>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

const AlarmBtn = styled.div<{ applied: number | undefined }>`
  width: 100%;
  height: 100%;
  margin: 1rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  border: 0.1rem solid ${COLOR.LIGHT_GREEN};
  background: ${({ applied }) =>
    applied ? COLOR.LIGHT_GREEN : COLOR.TEXT_WHITE};
`;

const AlarmApplicant = styled.div<{ applied: number | undefined }>`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9rem;
  text-align: center;
  letter-spacing: -0.03rem;
  margin-left: 0.4rem;
  color: ${({ applied }) => (applied ? COLOR.TEXT_WHITE : COLOR.LIGHT_GREEN)};
`;

export default AlarmFooter;
