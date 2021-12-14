import React, { ReactElement, useCallback, useState } from 'react';

// import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import { LiveStatus, MeetingList } from 'meeting';
import { useRecoilValue } from 'recoil';

import { deleteAlarm, newAlarm } from '../../../../api/alarm';
import { analytics } from '../../../../App';
import upcoming_noti_off__green from '../../../../assets/icon/landingPage/upcoming_noti_off__green.svg';
import upcoming_noti_on__green from '../../../../assets/icon/landingPage/upcoming_noti_on__green.svg';
import video_upcoming_tag__green from '../../../../assets/icon/landingPage/video_upcoming_tag__green.svg';
import voice_upcoming_tag__green from '../../../../assets/icon/landingPage/voice_upcoming_tag__green.svg';
import { COLOR } from '../../../../constant/color';
import useMini from '../../../../hook/useMini';
import { userInfoAtom } from '../../../../store/user';
import { getStartTimeForm } from '../../../../util/utils';
// import ImageRenderer from '../../../common/LazyLoading/ImageRenderer';
import DeleteAlarmModal from '../../../common/Modal/DeleteAlarmModal';
import NewAlarmModal from '../../../common/Modal/NewAlarmModal';
import UserProfile from '../UserProfile';

interface Props {
  data: MeetingList;
  idx: number;
  setMeetings: React.Dispatch<React.SetStateAction<MeetingList[]>>;
}

interface WrapperProps {
  idx: number;
  live_status: LiveStatus;
}

function MeetingCard({ idx, data, setMeetings }: Props): ReactElement {
  const [openNewAlarmModal, setOpenNewAlarmModal] = useState(false);
  const [openDeleteAlarmModal, setOpenDeleteAlarmModal] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);
  const { loginWithMini } = useMini();

  const { push } = useNavigator();

  const deleteAlarmHandler = useCallback(async () => {
    if (data && data?.alarm_id && userInfo) {
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
                alarm_id: null,
              };
            }
            return { ...prevState };
          }),
        );
        return true;
      }
    }
    return false;
  }, [data, setMeetings, userInfo]);

  const alarmHandler = useCallback(async () => {
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
                alarm_id: result.data.id,
              };
            }
            return prevState;
          }),
        );
        setOpenNewAlarmModal(true);
      }
    }
  }, [
    data.alarm_id,
    data.id,
    data.live_status,
    data.title,
    setMeetings,
    userInfo,
  ]);

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
      <CardImageWrapper>
        <TagWrapper>
          <MeetingTypeTag
            src={
              data.is_video
                ? video_upcoming_tag__green
                : voice_upcoming_tag__green
            }
          />
        </TagWrapper>

        <ImageThumbnail src={data.image} />
        {/* <LazyImageItemStyle url={data.image} inViewStyle={ImageStyle} /> */}
      </CardImageWrapper>
      <ContentsWrapper className="meeting-card__contents">
        <InfoWrapper>
          <MeetingTime className="body3 meeting-card__time">
            {getStartTimeForm(
              data.date,
              data.start_time,
              data.live_status,
              true,
            )}
          </MeetingTime>

          <MeetingTitle className="title3 meeting-card__title">
            {data.title}
          </MeetingTitle>

          <UserProfileStyle
            nickname={data.host.nickname}
            region={data.host.region_name || ''}
          />
        </InfoWrapper>
        <AlarmWrapper>
          <AlarmBtn
            hasAlarm={data.alarm_id ? true : false}
            className="meeting-card__alarm-icon"
            onClick={e => {
              e.stopPropagation();
              loginWithMini(alarmHandler);
            }}
          >
            <AlarmIcon
              src={
                data.alarm_id
                  ? upcoming_noti_on__green
                  : upcoming_noti_off__green
              }
            />
            {data.alarm_num}
          </AlarmBtn>
        </AlarmWrapper>
      </ContentsWrapper>
    </MeetingCardWrapper>
  );
}

const MeetingCardWrapper = styled.div<WrapperProps>`
  box-sizing: border-box;
  margin: 0 1.6rem;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  word-break: keep-all;
  background-color: ${COLOR.TEXT_WHITE};

  box-sizing: border-box;
  margin-top: ${props => props.idx === 0 && '0.8rem'};
`;

const ContentsWrapper = styled.div`
  width: calc(100% - 8rem);
  padding-left: 1.6rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardImageWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
`;

const TagWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: row;
  z-index: 1;
`;

const ImageThumbnail = styled.img`
  min-width: 8rem;
  height: 8rem;
  object-fit: cover;
  border-radius: 0.6rem;
  overflow: hidden;
`;

// const LazyImageItemStyle = styled(ImageRenderer)`
//   width: 100%;
//   height: 8rem;
//   object-fit: cover;
//   border-radius: 0.6rem;
//   overflow: hidden;
// `;

// const ImageStyle = css`
//   //TODO: 가로 세로 비율 변경
//   width: auto;
//   height: 8rem;
//   object-fit: cover;
// `;

const InfoWrapper = styled.div`
  /* width: calc(100% - 3rem); */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const MeetingTypeTag = styled.img``;

const AlarmBtn = styled.div<{ hasAlarm: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 5.5rem;

  padding: 0.5rem 0.9rem 0.5rem 0.8rem;
  border: ${({ hasAlarm }) => (hasAlarm ? 'noen' : `1px solid #41AC70`)};
  background: ${({ hasAlarm }) =>
    hasAlarm ? '#E0F3E9' : COLOR.BACKGROUND_WHITE};
  box-sizing: border-box;
  border-radius: 1.8rem;

  font-weight: 400;
  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: -0.03rem;
  color: #41ac70;
`;

const AlarmIcon = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.473rem;
`;

const AlarmWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const MeetingTime = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.1rem;
  margin-bottom: 0.2rem;
`;

const MeetingTitle = styled.div`
  width: 100%;

  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.3rem;
  color: ${COLOR.TEXT_BLACK};

  margin-bottom: 1.2rem;
  padding-right: 0.8rem;

  box-sizing: border-box;

  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  max-height: 5.2rem;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const UserProfileStyle = styled(UserProfile)`
  font-size: 11px;
  line-height: 100%;
`;

export default MeetingCard;
