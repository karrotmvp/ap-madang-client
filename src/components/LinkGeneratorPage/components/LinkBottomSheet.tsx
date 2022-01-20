import React, { ReactElement, useCallback, useState } from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import mini from '../../../util/mini';
import BottomSheet from '../../common/BottomSheet';
import UrlBox from './UrlBox';

type Props = {
  onClose: () => void;
  open: boolean;
  url: string;
};

function LinkBottomSheet({ onClose, open, url }: Props): ReactElement {
  const [closeState, setCloseState] = useState(!open);
  const [copySuccess, setCopySuccess] = useState(false);

  const closeHandler = useCallback(() => {
    setCloseState(true);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  const onClickOutSide = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.stopPropagation();
    closeHandler();
  };

  const moveToDanngn = () => {
    if (copySuccess) {
      window.open('karrot.alpha://story_articles/new?interest_id=234');
      mini.close();
    }
  };

  return (
    <BottomSheet
      onClose={onClickOutSide}
      open={closeState}
      innerModalStyle={css`
        transform: ${copySuccess ? 'translateY(0)' : 'translateY(6.4rem)'};
        transition-property: all;
        transition-duration: 0.5s;
      `}
    >
      <BottomSheetWrapper copySuccess={copySuccess}>
        <Title>음성모임방이 생성됐어요!</Title>
        <SubTitle>
          아래 링크를 복사해 동네생활에서 이웃들을 모아보세요.
          <br />
          당근마켓앱이 있어야 링크에 접속할 수 있어요.
        </SubTitle>
        <UrlBox
          copySuccess={copySuccess}
          setCopySuccess={setCopySuccess}
          url={url}
        />

        <WriteButton copySuccess={copySuccess} onClick={moveToDanngn}>
          동네생활 글쓰러가기
        </WriteButton>
      </BottomSheetWrapper>
    </BottomSheet>
  );
}

export default LinkBottomSheet;

const BottomSheetWrapper = styled.div<{ copySuccess: boolean }>`
  /* height: ${({ copySuccess }) =>
    copySuccess ? 'calc(100%)' : 'calc(100% - 6.4rem)'};
  transform: ${({ copySuccess }) =>
    copySuccess ? 'translateY(0)' : 'translateY(6.4rem)'}; */

  /* height: ${({ copySuccess }) => (copySuccess ? '30rem' : '20rem')}; */

  padding: 3.2rem 1.6rem 1.6rem 1.6rem;
  box-sizing: border-box;

  transition-property: all;
  transition-duration: 0.5s;
`;

const Title = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  line-height: 125%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.03rem;

  /* Scale/Gray/Gray900 */
  color: #212124;
`;

const SubTitle = styled.div`
  width: 100%;
  font-size: 1.4rem;
  line-height: 160%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02rem;

  /* Scale/Gray/Gray700 */
  color: #4d5159;
`;

const showButton = keyframes`
  0%{
  
    transform: translateY(20px);
    opacity:0;
  }

  100%{
  
    transform: translateY(0);
    opacity:100;
  }
`;

const WriteButton = styled.div<{ copySuccess: boolean }>`
  height: 4.8rem;

  margin-top: 2rem;
  display: flex;
  /* display: ${({ copySuccess }) => (copySuccess ? 'flex' : 'none')}; */
  justify-content: center;
  align-items: center;

  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.02rem;

  color: #ffffff;
  /* Scale/Gray/Gray300 */
  animation: ${showButton} 0.5s ease forwards;
  background: ${({ copySuccess }) => (copySuccess ? '#FF7E36' : '#dcdee3')};
  border-radius: 6px;
`;
