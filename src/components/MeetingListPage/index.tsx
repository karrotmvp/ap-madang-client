import React from 'react';

import styled from '@emotion/styled';

import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Banner from './components/Banner';
import PageTitle from './components/PageTitle';

const MeetingListPage: React.FC = () => {
  return (
    <View className="meeting-list">
      <CustomScreenHelmet />
      <PageTitle />
      <Spacing size="2.4rem" />
      <Banner />
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

export default MeetingListPage;
