import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import BubbleUI from 'react-bubble-ui';

import 'react-bubble-ui/dist/index.css';
import './bubble.css';
import CompanyBubble from './bubble/CompanyBubble';

export default function BubbleUIComponent(): ReactElement {
  const options = {
    size: 100,
    minSize: 20,
    gutter: 30,
    provideProps: true,
    numCols: 3,
    fringeWidth: 160,
    yRadius: 160,
    xRadius: 160,
    cornerRadius: 50,
    showGuides: false,
    compact: false,
    gravitation: 5,
  };

  return (
    <BubbleWrapper>
      BUBBLE UI 라이브러리 사용
      <BubbleUI
        options={options}
        className="myBubbleUI"
        style={{ width: '100%', height: '700px', overflowY: 'hidden' }}
      >
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
        <CompanyBubble key={Math.floor(Math.random() * 1000)} />
      </BubbleUI>
    </BubbleWrapper>
  );
}

const BubbleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`;
