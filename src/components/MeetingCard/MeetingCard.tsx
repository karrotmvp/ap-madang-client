import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';

import { deleteAlarm, newAlarm } from '../../api/alarm';
import card_noti_off from '../../assets/icon/card_noti_off.svg';
import card_noti_on from '../../assets/icon/card_noti_on.svg';
import { COLOR } from '../../constant/color';
import { LANDING } from '../../constant/message';
import useInterval from '../../hook/useInterval';
import { meetingsAtom, meetingType } from '../../store/meeting';
import { getRemainTime, getTimeForm } from '../../util/utils';
import DeleteAlarmModal from '../Modal/DeleteAlarmModal';
import NewAlarmModal from '../Modal/NewAlarmModal';

interface Props {
  data: meetingType;
  idx: number;
}

interface WrapperProps {
  idx: number;
  live_status: 'live' | 'upcoming' | 'tomorrow' | 'finish';
}

const MeetingCardWrapper = styled.div<WrapperProps>`
  box-sizing: border-box;
  margin: 0 0 1.6rem 0;
  height: auto;
  padding: 1.6rem 1.6rem 1.7rem 1.6rem;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  background-color: ${props =>
    props.live_status === 'tomorrow' ? COLOR.GRAY_000 : COLOR.TEXT_WHITE};
  border-radius: 0.6rem;
  border: 1px solid
    ${props =>
      props.live_status === 'tomorrow'
        ? COLOR.GRAY_000
        : COLOR.TEXTAREA_LIGHT_GRAY};
  box-sizing: border-box;
  margin-top: ${props => (props.idx === 0 ? '1.8rem' : 0)};
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlarmWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
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
    live_status === 'live'
      ? '0.8rem'
      : live_status === 'upcoming'
      ? '1rem'
      : '0'};
  margin-top: ${({ live_status }: MeetingTitleType) =>
    live_status === 'live' ? '0.8rem' : '.4rem'};
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
  color: ${COLOR.TEXT_GRAY};
`;

function MeetingCard({ idx, data }: Props): ReactElement {
  const setMeetings = useSetRecoilState(meetingsAtom);
  const [openNewAlarmModal, setOpenNewAlarmModal] = useState(false);
  const [openDeleteAlarmModal, setOpenDeleteAlarmModal] = useState(false);
  const [remainTime, setRemainTime] = useState('');

  const { push } = useNavigator();

  const deleteAlarmHandler = useCallback(async () => {
    if (data?.alarm_id) {
      const result = await deleteAlarm(data.alarm_id.toString());
      if (result.success) {
        setMeetings(el =>
          el.map(prevState => {
            if (prevState.id === data.id) {
              return { ...prevState, alarm_id: undefined };
            }
            return { ...prevState };
          }),
        );
        return true;
      }
    }
    return false;
  }, [data.alarm_id, data.id, setMeetings]);

  const alarmHandler = useCallback(
    async e => {
      e.stopPropagation();
      if (data?.alarm_id) {
        setOpenDeleteAlarmModal(true);
      } else if (data.id) {
        const result = await newAlarm(data.id.toString());
        if (result.success && result.data?.id) {
          setMeetings(el =>
            el.map(prevState => {
              if (prevState.id === data.id && result.data?.id) {
                return { ...prevState, alarm_id: result.data?.id };
              }
              return prevState;
            }),
          );
          setOpenNewAlarmModal(true);
        }
      }
    },
    [data.alarm_id, data.id, setMeetings],
  );

  const onClickCardHandler = useCallback(() => {
    push(`/meetings/${data.id}`);
  }, [data.id, push]);

  useInterval(
    () => {
      setRemainTime(getRemainTime(data.start_time));
    },
    data.live_status === 'upcoming' ? 10000 : null,
  );

  useEffect(() => {
    setRemainTime(getRemainTime(data.start_time));
  }, [data.start_time]);

  return (
    <MeetingCardWrapper
      className="meeting-card"
      live_status={data.live_status}
      onClick={onClickCardHandler}
      idx={idx}
    >
      {openNewAlarmModal && (
        <NewAlarmModal
          className="meeting-card__new-alarm-modal"
          closeHandler={() => setOpenNewAlarmModal(false)}
        />
      )}
      {openDeleteAlarmModal && (
        <DeleteAlarmModal
          className="meeting-card__delete-alarm-modal"
          closeHandler={() => setOpenDeleteAlarmModal(false)}
          deleteAlarmHandler={deleteAlarmHandler}
        />
      )}
      <ContentsWrapper className="meeting-card__contents">
        <InfoWrapper>
          <CardHeader>
            <MeetingTime className="body3 meeting-card__time">
              {getTimeForm(
                data.start_time,
                data.end_time,
                data.live_status,
                true,
              )}
            </MeetingTime>
          </CardHeader>

          <MeetingTitle
            className="body1 meeting-card__title"
            live_status={data.live_status}
          >
            {data.title}
          </MeetingTitle>
        </InfoWrapper>
        <AlarmWrapper className="meeting-card__alarm-icon">
          {data.alarm_id ? (
            <img src={card_noti_on} onClick={alarmHandler} />
          ) : (
            <img src={card_noti_off} onClick={alarmHandler} />
          )}
        </AlarmWrapper>
      </ContentsWrapper>
      {data.live_status === 'upcoming' && (
        <CardFooter className="body3 meeting-card__footer">
          <FooterText>
            {remainTime}
            {LANDING.START_MEETING_LATER}
          </FooterText>
        </CardFooter>
      )}
    </MeetingCardWrapper>
  );
}

export default MeetingCard;
