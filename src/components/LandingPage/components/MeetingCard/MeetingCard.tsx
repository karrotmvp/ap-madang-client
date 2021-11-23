import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import { MeetingList } from 'meeting';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { deleteAlarm, newAlarm } from '../../../../api/alarm';
import { analytics } from '../../../../App';
import card_noti_off from '../../../../assets/icon/card_noti_off.svg';
import card_noti_on from '../../../../assets/icon/card_noti_on.svg';
import camera_meeting_tag__gray from '../../../../assets/icon/home/camera_meeting_tag__gray.svg';
import voice_meeting_tag__gray from '../../../../assets/icon/home/voice_meeting_tag__gray.svg';
import { COLOR } from '../../../../constant/color';
import { codeAtom, userInfoAtom, UserInfoType } from '../../../../store/user';
import { getTimeForm } from '../../../../util/utils';
import { authHandler } from '../../../../util/withMini';
import DeleteAlarmModal from '../../../common/Modal/DeleteAlarmModal';
import NewAlarmModal from '../../../common/Modal/NewAlarmModal';

interface Props {
  data: MeetingList;
  idx: number;
  setMeetings: React.Dispatch<React.SetStateAction<MeetingList[]>>;
}

interface WrapperProps {
  idx: number;
  live_status: 'live' | 'upcoming' | 'tomorrow' | 'finish';
}

function MeetingCard({ idx, data, setMeetings }: Props): ReactElement {
  const [openNewAlarmModal, setOpenNewAlarmModal] = useState(false);
  const [openDeleteAlarmModal, setOpenDeleteAlarmModal] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const setCode = useSetRecoilState(codeAtom);

  const { push } = useNavigator();

  const deleteAlarmHandler = useCallback(async () => {
    if (data?.alarm_id && userInfo) {
      logEvent(analytics, 'delete_alarm__click', {
        location: 'meeting_card',
        meeting_id: data.id,
        meeting_name: data.title,
        is_current: data.live_status,
        userNickname: userInfo.nickname,
        userRegion: userInfo.region,
      });
      const result = await deleteAlarm(data.alarm_id.toString());
      if (result.success) {
        setMeetings(el =>
          el.map(prevState => {
            if (prevState.id === data.id) {
              return {
                ...prevState,
                alarm_num: prevState.alarm_num - 1,
                alarm_id: undefined,
              };
            }
            return { ...prevState };
          }),
        );
        return true;
      }
    }
    return false;
  }, [
    data.alarm_id,
    data.id,
    data.live_status,
    data.title,
    setMeetings,
    userInfo,
  ]);

  const alarmHandler = useCallback(
    (userInfo: UserInfoType) => async (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (data?.alarm_id) {
        setOpenDeleteAlarmModal(true);
      } else if (data.id && userInfo) {
        logEvent(analytics, 'add_alarm__click', {
          location: 'meeting_card',
          meeting_id: data.id,
          meeting_name: data.title,
          is_current: data.live_status,
          userNickname: userInfo.nickname,
          userRegion: userInfo.region,
        });
        const result = await newAlarm(data.id.toString());
        if (result.success && result.data?.id) {
          setMeetings(el =>
            el.map(prevState => {
              if (prevState.id === data.id && result.data?.id) {
                return {
                  ...prevState,
                  alarm_num: prevState.alarm_num + 1,
                  alarm_id: result.data?.id,
                };
              }
              return prevState;
            }),
          );
          setOpenNewAlarmModal(true);
        }
      }
    },
    [data, setMeetings],
  );

  const onClickCardHandler = useCallback(() => {
    push(`/meetings/${data.id}`);
  }, [data.id, push]);

  return (
    <MeetingCardWrapper
      className="meeting-card"
      live_status={data.live_status}
      onClick={onClickCardHandler}
      idx={idx}
    >
      {openNewAlarmModal && (
        <NewAlarmModal
          open={openNewAlarmModal}
          className="meeting-card__new-alarm-modal"
          closeHandler={() => setOpenNewAlarmModal(false)}
        />
      )}
      {openDeleteAlarmModal && (
        <DeleteAlarmModal
          open={openDeleteAlarmModal}
          className="meeting-card__delete-alarm-modal"
          closeHandler={() => setOpenDeleteAlarmModal(false)}
          deleteAlarmHandler={deleteAlarmHandler}
        />
      )}
      <ContentsWrapper className="meeting-card__contents">
        <CardHeader>
          <MeetingTypeTag
            src={
              data.is_video ? camera_meeting_tag__gray : voice_meeting_tag__gray
            }
          />
          <AlarmBtn
            hasAlarm={data.alarm_id !== undefined}
            className="meeting-card__alarm-icon"
          >
            {data.alarm_id ? (
              <AlarmIcon
                src={card_noti_on}
                onClick={
                  !userInfo
                    ? authHandler(
                        alarmHandler,
                        setCode,
                        setUserInfo,
                        'home_alaram',
                      )
                    : alarmHandler(userInfo)
                }
              />
            ) : (
              <AlarmIcon src={card_noti_off} onClick={alarmHandler(userInfo)} />
            )}
            {data.alarm_num}
          </AlarmBtn>
        </CardHeader>
        <InfoWrapper>
          <MeetingTime className="body3 meeting-card__time">
            {getTimeForm(
              data.start_time,
              data.end_time,
              data.live_status,
              true,
            )}
          </MeetingTime>

          <MeetingTitle
            className="title3 meeting-card__title"
            live_status={data.live_status}
          >
            {data.title}
          </MeetingTitle>
        </InfoWrapper>
      </ContentsWrapper>
      {data.live_status === 'upcoming' && (
        <CardFooter className="body3 meeting-card__footer">
          <FooterText>{data.description_text}</FooterText>
        </CardFooter>
      )}
    </MeetingCardWrapper>
  );
}

const MeetingCardWrapper = styled.div<WrapperProps>`
  box-sizing: border-box;
  margin: 0 0 1.6rem 0;
  height: auto;
  padding: 1.1rem 1.5rem 1.7rem 1.5rem;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  background-color: ${COLOR.TEXT_WHITE};
  border-radius: 0.6rem;
  border: 1px solid ${COLOR.GRAY_200};
  box-sizing: border-box;
  margin-top: ${props => (props.idx === 0 ? '1.8rem' : 0)};
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeetingTypeTag = styled.img`
  width: 6.8rem;
  height: 2.4rem;
  margin-bottom: 0.6rem;
`;

const AlarmBtn = styled.div<{ hasAlarm: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 6rem;

  padding: 0.4rem 0.9rem 0.4rem 0.8rem;
  border: ${({ hasAlarm }) =>
    hasAlarm ? '1px solid #41AC70' : `1px solid #85878A`};
  background: ${({ hasAlarm }) => (hasAlarm ? '#E0F3E9' : 'none')};
  box-sizing: border-box;
  border-radius: 1.8rem;

  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.8rem;
  letter-spacing: -0.03rem;
  color: ${({ hasAlarm }) => (hasAlarm ? '#41AC70' : COLOR.GRAY_600)}; ;
`;

const AlarmIcon = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.2rem;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MeetingTime = styled.div`
  color: ${COLOR.LIGHT_GREEN};
`;

interface MeetingTitleType {
  live_status: 'live' | 'tomorrow' | 'upcoming' | 'finish';
}

const MeetingTitle = styled.div`
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: ${({ live_status }: MeetingTitleType) =>
    live_status === 'upcoming' ? '0.8rem' : '0'};
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FooterText = styled.div`
  font-size: 1.4rem;
  line-height: 1.7rem;
  letter-spacing: -0.02rem;
  color: ${COLOR.FONT_BODY_GRAY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default MeetingCard;
