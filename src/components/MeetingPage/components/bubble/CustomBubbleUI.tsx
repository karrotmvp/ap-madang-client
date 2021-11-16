import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';

const options = {
  size: 180,
  minSize: 20,
  gutter: 8,
  provideProps: true,
  numCols: 6,
  fringeWidth: 160,
  yRadius: 130,
  xRadius: 220,
  cornerRadius: 50,
  showGuides: false,
  compact: true,
  gravitation: 5,
};

export type InfoType =
  | {
      meeting: {
        id: number;
        title: string;
        channel_name: string;
        sub_topics: string[];
        description: {
          text: string;
          recommend_user: { text: string }[];
          recommend_topic: { text: string }[];
        };
      };
      user: {
        id: number;
        nickname: string;
        profile_image_url: string;
        manner_temperature: number;
      };
      agora_token: string;
    }
  | undefined;

function CustomBubbleUI(): ReactElement {
  const [bubbleNum, setBubbleNum] = useState(10);

  const children = new Array(bubbleNum).fill(0).map((_, idx) => {
    return (
      <Bubble key={idx} idx={idx}>
        test
      </Bubble>
    );
  });
  console.log(options);

  const increase = useCallback(() => {
    setBubbleNum(prop => prop + 1);
  }, []);

  const decrease = useCallback(() => {
    setBubbleNum(prop => (prop !== 0 ? prop - 1 : prop));
  }, []);

  return (
    <MeetingPageWrapper className="myBubbleUI">
      <BubbleWrapper className="bubble-wrapper">
        <BubbleInnerWrapper>
          <BubbleFlex>{children}</BubbleFlex>
        </BubbleInnerWrapper>
      </BubbleWrapper>
      <div
        style={{
          width: '100px',
          height: '40px',
          background: 'Green',
          fontSize: '25px',
          textAlign: 'center',
        }}
        onClick={increase}
      >
        +
      </div>
      <div
        style={{
          width: '100px',
          height: '40px',
          background: 'Red',
          fontSize: '25px',
          textAlign: 'center',
        }}
        onClick={decrease}
      >
        -
      </div>
    </MeetingPageWrapper>
  );
}

const MeetingPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BubbleWrapper = styled.div`
  width: 90%;
  height: calc(90% - 200px);
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const BubbleInnerWrapper = styled.div`
  width: 70%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

const BubbleFlex = styled.div`
  height: 200px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Bubble = styled.div<{ idx: number }>`
  z-index: 1000;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: ${({ idx }) => (idx % 5 < 2 ? '10px 20px' : '10px')};
  background: white;
  color: black;
  border: 1px solid black;
`;

export default CustomBubbleUI;
