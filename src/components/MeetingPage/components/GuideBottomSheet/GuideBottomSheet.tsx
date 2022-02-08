import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';

import orange_house from '../../../../assets/icon/common/orange_house.svg';
import { COLOR } from '../../../../style/color';
import BottomSheet from '../../../common/BottomSheet';
import GuideDescription from './GuideDescription';

interface Props {
  onClose: () => void;
}

function GuideBottomSheet({ onClose }: Props): ReactElement {
  const [closeState, setCloseState] = useState(!open);

  const closeHandler = useCallback(() => {
    setCloseState(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const onClickOutSide = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.stopPropagation();
    closeHandler();
  };

  return (
    <BottomSheet
      className="guide_bottom_sheet"
      onClose={onClickOutSide}
      open={closeState}
      showCloseButton
    >
      <InfoTextWrapper>
        <TitleWrapper>
          <LogoImg src={orange_house} />
          <TitleText>따뜻한 모임을 함께 만들어요</TitleText>
        </TitleWrapper>
        <ContentsWrapper>
          <GuideDescription
            title={'서로 배려하고 존중해요.'}
            subTitle={
              '청소년을 포함한 다양한 이웃들이 대화하는 공간임을 기억해 주세요.'
            }
          />
          <GuideDescription
            title={'이웃 모두가 함께 나눌 수 있는 대화를 해요.'}
            subTitle={
              '친분을 과시하지 않기로 해요. 사적인 대화는 다른 공간에서 해요.'
            }
          />
          <GuideDescription
            title={'이웃을 공개적으로 비방하지 않아요.'}
            subTitle={
              '남녀노소 모두가 함께하는 공간이에요. 이웃을 공개적으로 비방하지 않기로 해요.'
            }
          />
          <GuideDescription
            title={'마이크를 켜라고 강요하지 않기로 해요.'}
            subTitle={
              '자유롭게 참여하는 공간이에요. 말하는 것뿐 아니라 듣는 것도 대화에 참여하는 거예요.'
            }
          />
        </ContentsWrapper>
      </InfoTextWrapper>
    </BottomSheet>
  );
}

const InfoTextWrapper = styled.div`
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  max-height: 95%;
  padding: 2rem 2.4rem 2rem 2.4rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoImg = styled.img`
  margin: 0.74rem 0 0.8rem 0;
`;

const TitleText = styled.div`
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.7rem;
  text-align: center;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_BLACK};
  white-space: pre-line;
  margin-bottom: 4rem;
`;

const ContentsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2.8rem;
  overflow-y: scroll;
  padding-right: 0.8rem;
`;

export default GuideBottomSheet;
