import React, { useCallback, useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { ScreenHelmet } from '@karrotframe/navigator';
import { useRouteMatch } from 'react-router-dom';

import { deleteAlarm, newAlarm } from '../../api/alarm';
import { getMeetingDetail, MeetingDetailType } from '../../api/meeting';
import { analytics } from '../../App';
import arrow_iOS_large from '../../assets/icon/arrow_iOS_large.svg';
import clock from '../../assets/icon/clock.svg';
import nav_back from '../../assets/icon/nav_back.svg';
import notification_empty from '../../assets/icon/notification_empty.svg';
import notification_fill from '../../assets/icon/notification_fill.svg';
import { DescriptionList } from '../../components/DescriptionList/DescriptionList';
import DeleteAlarmModal from '../../components/Modal/DeleteAlarmModal';
import MeetingGuideModal from '../../components/Modal/MeetingGuideModal';
import NewAlarmModal from '../../components/Modal/NewAlarmModal';
import { COLOR } from '../../constant/color';
import { MEETING_DETAIL } from '../../constant/message';
import useInterval from '../../hook/useInterval';
import { getRemainTime, getTimeForm } from '../../util/utils';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;
`;

const NavCustomBtn = styled.img`
  margin-left: 1.5rem;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 14rem;
`;

const LineDivider = styled.div`
  margin: 0 0.8rem;
  border-bottom: 1px solid ${COLOR.LINE_DIVIDER_GRAY};
`;

const BlockDivider = styled.div`
  height: 1rem;
  background-color: ${COLOR.BLOCK_DIVIDER_GRAY};
`;

const ContentsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.4rem 1.6rem 1.8rem 1.6rem;
`;

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: 0.9rem;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Time = styled.div`
  color: ${COLOR.TEXT_GRAY};
  margin-left: 0.8rem;
`;

const DescriptionWrapper = styled.div`
  padding: 2.2rem 1.6rem 0 1.6rem;
`;

const MannerInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2.4rem 3.1rem 2.4rem 2.4rem;
  justify-content: space-between;
  align-items: center;
  white-space: pre-line;
`;

const InfoCardTitle = styled.div`
  color: ${COLOR.TEXT_BLACK};
`;

const MoreIcon = styled.div``;

const NavBar = styled.div`
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

const AlarmBtn = styled.div`
  width: 6.8rem;
  height: 4.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.6rem;
  border-radius: 0.6rem;
  border: 0.1rem solid ${COLOR.TEXTAREA_LIGHT_GRAY};
`;

const AlarmApplicant = styled.div<{ applied: number | undefined }>`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9rem;
  text-align: center;
  letter-spacing: -0.02rem;
  margin-left: 0.4rem;
  color: ${({ applied }) =>
    applied ? COLOR.LIGHT_GREEN : COLOR.FONT_BODY_GRAY};
`;

const JoinBtn = styled.a`
  flex: 1;
  height: 4.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  background-color: ${COLOR.LIGHT_GREEN};
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  text-align: center;
  letter-spacing: -0.02rem;

  color: ${COLOR.TEXT_WHITE};

  text-decoration: none;
  outline: none;

  &:hover,
  &:active {
    text-decoration: none;
    color: ${COLOR.TEXT_WHITE};
  }
`;

const DisableBtn = styled.div`
  flex: 1;
  height: 4.4rem;
  margin-left: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  background-color: ${COLOR.TEXTAREA_LIGHT_GRAY};
  color: ${COLOR.TEXT_WHITE};
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  text-align: center;
  letter-spacing: -0.02rem;
`;

const GreenInfoBox = styled.div`
  background: ${COLOR.PRIMARY_L1};
  border: 0.1rem solid ${COLOR.LIGHT_GREEN};
  color: ${COLOR.LIGHT_GREEN};
  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: -0.03rem;
  border-radius: 0.6rem;
  margin: 1.6rem 1.6rem 0 1.6rem;
  padding: 1rem 1.4rem;
`;

interface MatchParams {
  id: string;
}

const defaultValue: MeetingDetailType = {
  id: 0,
  title: '',
  start_time: '',
  end_time: '',
  live_status: 'tomorrow',
  alarm_id: undefined,
  alarm_num: 0,
  description: {
    recommend_user: [{ text: '' }],
    recommend_topic: [{ text: '' }],
  },
  meeting_url: '',
  region: '',
  image: '',
};

const MeetingDetailPage = () => {
  const [data, setData] = useState<MeetingDetailType>(defaultValue);
  const [remainTime, setRemainTime] = useState('');
  const [openGuideModal, setOpenGuideModal] = useState(false);
  const [openNewAlarmModal, setOpenNewAlarmModal] = useState(false);
  const [openDeleteAlarmModal, setOpenDeleteAlarmModal] = useState(false);

  const matchId = useRouteMatch<MatchParams>({
    path: '/meetings/:id',
  }) || { params: { id: '' } };

  // 모임 상세정보 fetch
  const fetchData = useCallback(async (id: string) => {
    const result = await getMeetingDetail(id);
    if (result.success && result.data) setData(result.data);
  }, []);

  // 알람 신청 해제 핸들러
  const deleteAlarmHandler = useCallback(async () => {
    if (data?.alarm_id && matchId?.params.id) {
      logEvent(analytics, 'delete_alarm', {
        location: 'detail_page',
        meeting_id: data.id,
        meeting_name: data.title,
        is_current: data.live_status,
      });
      const result = await deleteAlarm(data.alarm_id.toString());
      if (result.success) {
        setData(prevState => {
          if (prevState)
            return {
              ...prevState,
              alarm_id: undefined,
            };
          return prevState;
        });
        return true;
      }
    }
    return false;
  }, [data, matchId.params.id]);

  // 알람 신청 핸들러
  const alarmHandler = useCallback(async () => {
    if (data?.alarm_id) {
      setOpenDeleteAlarmModal(true);
    } else if (matchId?.params.id) {
      logEvent(analytics, 'add_alarm', {
        location: 'detail_page',
        meeting_id: data.id,
        meeting_name: data.title,
        is_current: data.live_status,
      });
      const result = await newAlarm(matchId.params.id);
      if (result.success && result.data?.id) {
        setData(prevState => {
          if (prevState) return { ...prevState, alarm_id: result.data?.id };
          return prevState;
        });
        setOpenNewAlarmModal(true);
      }
    }
  }, [data, matchId.params.id]);

  const trackJoinUser = () => {
    logEvent(analytics, 'join_meeting_btn', {
      meeting_id: data.id,
      meeting_name: data.title,
      is_current: data.live_status,
    });
  };

  // 하단 남은시간 타이머 업데이트
  useInterval(
    () => {
      setRemainTime(getRemainTime(data.start_time));
    },
    data.live_status === 'upcoming' ? 10000 : null,
  );

  useEffect(() => {
    if (matchId?.params.id && !data.id) fetchData(matchId.params.id);
  }, [data.id, fetchData, matchId.params.id]);

  useEffect(() => {
    setRemainTime(getRemainTime(data.start_time));
  }, [data.start_time]);

  useEffect(() => {
    data.id !== 0 &&
      logEvent(analytics, 'detail_page', {
        meeting_id: data.id,
        meeting_name: data.title,
        is_current: data.live_status,
      });
  }, [data, data.id, data.live_status, data.title]);

  return (
    <PageWrapper className="meeting-detail">
      <ScreenHelmet customBackButton={<NavCustomBtn src={nav_back} />} />
      {openGuideModal && (
        <MeetingGuideModal closeHandler={() => setOpenGuideModal(false)} />
      )}
      {openNewAlarmModal && (
        <NewAlarmModal closeHandler={() => setOpenNewAlarmModal(false)} />
      )}
      {openDeleteAlarmModal && (
        <DeleteAlarmModal
          closeHandler={() => setOpenDeleteAlarmModal(false)}
          deleteAlarmHandler={deleteAlarmHandler}
        />
      )}
      <ContentsWrapper className="meeting-detail__contents">
        <BannerImg src={data.image} />
        <TitleWrapper className="meeting-detail__header">
          <Title className="title1">{data?.title}</Title>
          <TimeWrapper>
            <img src={clock} />
            <Time className="body4">
              {getTimeForm(data.start_time, data.end_time, data.live_status)}
              {data.live_status !== 'live' && '에 열려요.'}
            </Time>
          </TimeWrapper>
        </TitleWrapper>
        <LineDivider />
        <GreenInfoBox>{MEETING_DETAIL.GREEN_BOX_INFO}</GreenInfoBox>
        <DescriptionWrapper className="meeting-detail__body">
          <DescriptionList
            title={MEETING_DETAIL.DESCRIPTION_TITLE1}
            data={data?.description.recommend_user}
          />
          <DescriptionList
            title={MEETING_DETAIL.DESCRIPTION_TITLE2}
            data={data.description.recommend_topic}
          />
        </DescriptionWrapper>
        <BlockDivider />
        <MannerInfoCardWrapper
          className="meeting-detail__footer-banner"
          onClick={() => {
            logEvent(analytics, 'show_guide_modal', {
              location: 'detail_page',
              meeting_id: data.id,
              meeting_name: data.title,
              is_current: data.live_status,
            });
            setOpenGuideModal(true);
          }}
        >
          <InfoCardTitle className="title3">
            {MEETING_DETAIL.MANNER_INFO_CARD}
          </InfoCardTitle>
          <MoreIcon>
            <img src={arrow_iOS_large} />
          </MoreIcon>
        </MannerInfoCardWrapper>
        <BlockDivider />
      </ContentsWrapper>
      <NavBar className="meeting-detail__footer-nav-bar">
        {data.live_status !== 'live' && (
          <AlarmBtn onClick={alarmHandler}>
            {data.alarm_id ? (
              <img src={notification_fill} />
            ) : (
              <img src={notification_empty} />
            )}
            {data.alarm_num > 4 && (
              <AlarmApplicant applied={data.alarm_id}>
                {data.alarm_num}
              </AlarmApplicant>
            )}
          </AlarmBtn>
        )}
        {data.live_status === 'live' ? (
          <JoinBtn
            href={data.meeting_url}
            target="_blank"
            onClick={trackJoinUser}
          >
            {MEETING_DETAIL.JOIN_NOW}
          </JoinBtn>
        ) : (
          <DisableBtn>
            {data.live_status === 'upcoming'
              ? `${remainTime} ${MEETING_DETAIL.JOIN_LATER}`
              : MEETING_DETAIL.CLOSE_MEETING}
          </DisableBtn>
        )}
      </NavBar>
    </PageWrapper>
  );
};

export default MeetingDetailPage;
