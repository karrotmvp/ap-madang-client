import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';

import { COLOR } from '../../../../style/color';

function SkeletonCard(): ReactElement {
  return (
    <MeetingCardWrapper className="meeting-card">
      <Skeleton
        baseColor={COLOR.GREY_300}
        count={1}
        style={{ marginBottom: '1rem', height: '4.8rem' }}
      />
      <Skeleton
        baseColor={COLOR.GREY_300}
        count={1}
        style={{ marginBottom: '1rem', height: '2.3rem' }}
      />
    </MeetingCardWrapper>
  );
}

const MeetingCardWrapper = styled.div`
  box-sizing: border-box;
  margin: 1.6rem 0 1.6rem 0;
  height: auto;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  background-color: ${COLOR.TEXT_WHITE};
  border-radius: 0.6rem;
  border: 1px solid ${COLOR.GREY_000};
  box-sizing: border-box;
  margin-top: '1.8rem';
  opacity: 0.5;
`;

export default SkeletonCard;
