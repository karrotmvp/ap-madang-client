/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, useState, useMemo } from 'react';
import { ScreenHelmet } from 'karrotframe';
import 'karrotframe/lib/index.css';
import Arrow_back_and from '../../assets/icon/Arrow_back_and.svg';
import Arrow_back_ios from '../../assets/icon/Arrow_back_ios.svg';
import styled from '@emotion/styled';
import ReservationBtn from '../../components/Button/ReservationBtn';
import checkMobileType from '../../util/checkMobileType';
import ReservationModal from '../../components/Modal/ReservationModal';

interface Props {}

const ReservationStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  height: 100%;
  padding: 3rem 2.4rem 3.7rem 2.4rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 3.4rem;
  max-width: 34rem;
  word-break: keep-all;
`;

const FormStyle = styled.div`
  flex: 1;
  align-content: stretch;
  overflow: auto;
`;

const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const InfoText = styled.div`
  color: #767676;
  padding-bottom: 1.4rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  padding: 1.1rem 1rem;
  margin-bottom: 1.5rem;
  background-color: #3b3e41;
  border-radius: 0.6rem;

  color: white;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 1.7rem;
  letter-spacing: -0.015em;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -0.8rem;
    margin-bottom: -0.8rem;
    border: 8px solid transparent;
    border-top-color: #3b3e41;
    border-bottom: 0;
  }
`;

function ReservationPage({}: Props): ReactElement {
  const [openModal, setOpenModal] = useState(false);
  const [selectForm] = useState<boolean[]>([true, false, false, false]);

  const FooterBtn = useMemo(() => {
    if (selectForm.includes(true)) {
      return (
        <ReservationBtn
          onClick={() => {
            setOpenModal(true);
          }}
          text={'오픈시 알림받기'}
        />
      );
    }
    return <ReservationBtn disabled text={'오픈시 알림받기'} />;
  }, [selectForm]);

  return (
    <ReservationStyle>
      {openModal && <ReservationModal openHandler={setOpenModal} />}
      <ScreenHelmet
        customCloseButton={
          <img
            style={{ width: '1.58rem', height: '1.58rem' }}
            src={
              checkMobileType() === 'Android' ? Arrow_back_and : Arrow_back_ios
            }
          />
        }
      />
      <Title>
        관악구에 거리두기 걱정없이 이웃들과 만날 수 있는 공간을 오픈 준비
        중이에요!
      </Title>
      <FormStyle></FormStyle>

      <Footer>
        <InfoText>
          나만없어강아지님 알림 신청하고
          <br />
          즐거운 이웃과의 만남을 놓치지 마세요
        </InfoText>
        <Message>🎉 2,123명이 벌써 기다리고 있어요.</Message>
        {FooterBtn}
      </Footer>
    </ReservationStyle>
  );
}

export default ReservationPage;
