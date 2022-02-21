import React from 'react';

import styled from '@emotion/styled';
import video_icon from '@icon/home/video_icon.svg';
import mic_icon from '@icon/MeetingListPage/mic_icon.svg';

type Props = {
  isVideo: boolean;
};

function Tag({ isVideo }: Props) {
  return (
    <TagWrapper>
      <Icon src={isVideo ? video_icon : mic_icon} />
      <TagName>{isVideo ? '화상모임' : '음성모임'}</TagName>
    </TagWrapper>
  );
}

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.img`
  margin-right: 0.6rem;
`;

const TagName = styled.span`
  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: -0.04rem;

  color: ${({ theme }) => theme.colors.$gray600};
`;

export default Tag;
