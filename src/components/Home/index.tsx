import React, { useCallback, useEffect } from 'react';

import main_logo from '@assets/icon/common/main_logo.svg';
import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import mini from '@util/mini';
import { getQueryString } from '@util/utils';

import { analytics } from '../../App';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Banner from './components/Banner';
import DetailSheet from './components/DetailSheet';
import EmptyMeeting from './components/EmptyMeeting';
import FloatWrapper from './components/FloatWrapper';
import MeetingList from './components/MeetingList';
import PageTitle from './components/PageTitle';
import Spacing from './components/Spacing';
import useGetMeetingList from './hook/useGetMeetingList';
import useMeetingDetail from './hook/useMeetingDetail';

type MainProps = { existMeetings: boolean };

const MainContents = ({ existMeetings }: MainProps) => {
  return <main>{existMeetings ? <MeetingList /> : <EmptyMeeting />}</main>;
};

const Home = () => {
  const { meetings } = useGetMeetingList();
  const existMeetings = meetings.length !== 0;
  const { push } = useNavigator();

  useMeetingDetail();

  useEffect(() => {
    logEvent(analytics, 'home__show');
  }, []);

  const goBackHandler = useCallback(() => {
    const withScheme = getQueryString(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'scheme',
    );
    if (!withScheme) mini.close();
  }, []);

  return (
    <>
      {existMeetings && <FloatWrapper />}
      <View className="home">
        <CustomScreenHelmet
          appendMiddle={<img src={main_logo} />}
          appendRight={<Spacing width="1.75rem" />}
          onCustomCloseButton={goBackHandler}
        />

        <DetailSheet />
        <PageTitle />
        <Spacing height="2.4rem" />
        <Banner onClick={() => push('/guide/service')} />
        <Spacing height="1.6rem" />
        <MainContents existMeetings={existMeetings} />
      </View>
    </>
  );
};

const View = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.4rem 1.6rem;
  box-sizing: border-box;
`;

export default Home;
