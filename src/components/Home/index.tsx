import React from 'react';

import styled from '@emotion/styled';

import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Banner from './components/Banner';
import MeetingList from './components/MeetingList';
import PageTitle from './components/PageTitle';
import useMeetingDetail from './hook/useMeetingDetail';

const MainContents = () => {
  return (
    <main>
      <MeetingList />
    </main>
  );
};

const Home = () => {

  useMeetingDetail();

  return (
    <View className="home">
      <CustomScreenHelmet />
      <PageTitle />
      <Spacing size="2.4rem" />
      <Banner />
      <Spacing size="1.6rem" />
      <MainContents />
    </View>
  );
};

const View = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.4rem 1.6rem;
  box-sizing: border-box;
`;

const Spacing = styled.div<{ size: string }>`
  width: 100%;
  height: ${({ size = '1.6rem' }) => size};
`;

export default Home;
