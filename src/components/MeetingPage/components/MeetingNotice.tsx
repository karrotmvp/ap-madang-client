import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

interface Props {
  subTopic: string[];
}

function MeetingNotice({ subTopic }: Props): ReactElement {
  return (
    <NoticeWrapper>
      <EmojiWrapper>🐳</EmojiWrapper>
      <Message>{subTopic.map(el => el)}</Message>
    </NoticeWrapper>
  );
}

const NoticeWrapper = styled.div`
  width: calc(100% - 4rem);
  box-sizing: border-box;
  margin: 1rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: row;
`;

const EmojiWrapper = styled.div`
  flex: 1;
`;

const Message = styled.div`
  flex: 9;
`;

export default MeetingNotice;
