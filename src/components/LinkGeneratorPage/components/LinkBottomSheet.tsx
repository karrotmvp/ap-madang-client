import React, { ReactElement, useCallback, useState } from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import closeBtn from '../../../assets/icon/common/nav_close.svg';
import confetti from '../../../assets/icon/linkGenerator/confetti.svg';
import { daangnBridge } from '../../../util/daangnBridge';
import mini from '../../../util/mini';
import BottomSheet from '../../common/BottomSheet';
import PrimaryButton from '../../common/PrimaryButton';
import CopyButton from './CopyButton';

type Props = {
  onClose: () => void;
  open: boolean;
  url: string;
};

function LinkBottomSheet({ onClose, open, url }: Props): ReactElement {
  const [closeState, setCloseState] = useState(!open);
  const [copySuccess, setCopySuccess] = useState(false);
  const goBackHandler = () => {
    window.close();
    daangnBridge.router.close();
    mini.close();
  };

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
      window.open(
        `${
          process.env.NODE_ENV === 'production' ? 'karrot' : 'karrot.alpha'
        }://story_articles/new?interest_id=234`,
      );
      goBackHandler();
    }
  };

  return (
    <BottomSheet
      onClose={onClickOutSide}
      open={closeState}
      innerModalStyle={css`
        transform: ${copySuccess ? 'translateY(0)' : 'translateY(6.2rem)'};
        transition-property: all;
        transition-duration: 0.5s;
      `}
    >
      <BottomSheetWrapper copySuccess={copySuccess}>
        <IconImg src={closeBtn} onClick={closeHandler} />
        <ConfettiIcon src={confetti} />
        <Title>
          생성된 링크를 복사하고
          <br />
          동네생활에 공유해보세요!
        </Title>
        <SubTitle>동네생활 글에 링크를 붙여넣고 이웃들을 모아보세요.</SubTitle>
        <CopyButton
          copySuccess={copySuccess}
          onCopySuccess={() => setCopySuccess(true)}
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
  padding: 2.8rem 1.6rem 1.4rem 1.6rem;
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconImg = styled.img`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;

const ConfettiIcon = styled.img`
  width: 8rem;
  height: 8rem;
  margin-bottom: 1.2rem;
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
  margin-bottom: 1.2rem;
`;

const SubTitle = styled.div`
  width: 100%;
  font-size: 1.4rem;
  line-height: 160%;
  font-style: normal;
  font-weight: normal;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02rem;

  /* Scale/Gray/Gray700 */
  color: #4d5159;
  margin-bottom: 2rem;
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

const WriteButton = styled(PrimaryButton)<{ copySuccess: boolean }>`
  height: 4.8rem;
  margin: 2.4rem 1.6rem 0 1.6rem;
  box-sizing: border-box;
  animation: ${showButton} 0.5s ease forwards;
  background: ${({ copySuccess }) => (copySuccess ? '#FF7E36' : '#dcdee3')};
`;
