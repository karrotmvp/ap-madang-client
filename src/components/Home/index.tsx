import React, { useCallback, useEffect } from 'react';

import main_logo from '@assets/icon/common/main_logo.svg';
import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';
import mini from '@util/mini';

import { analytics } from '../../App';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Banner from './components/Banner';
import DetailSheet from './components/DetailSheet';
import FloatWrapper from './components/FloatWrapper';
import MeetingList from './components/MeetingList';
import PageTitle from './components/PageTitle';
import Spacing from './components/Spacing';
import useMeetingDetail from './hook/useMeetingDetail';

const MainContents = () => {
  return (
    <main>
      <MeetingList />
    </main>
  );
};

const Home = () => {
  const { push } = useNavigator();

  useMeetingDetail();

  useEffect(() => {
    logEvent(analytics, 'home__show');
  }, []);

  const goBackHandler = useCallback(() => {
    mini.close();
    mini.close();
  }, []);

  return (
    <>
      <FloatWrapper />
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
        <MainContents />
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
