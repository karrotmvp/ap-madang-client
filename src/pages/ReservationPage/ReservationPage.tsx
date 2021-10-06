/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, useState, useMemo } from 'react';
import { ScreenHelmet } from 'karrotframe';
import 'karrotframe/lib/index.css';

import styled from '@emotion/styled';
import ReservationBtn from '../../components/Button/ReservationBtn';
import checkMobileType from '../../util/checkMobileType';
import ReservationModal from '../../components/Modal/ReservationModal';
import RotateTitle from '../../components/Title/RotateTitle';
import ResizingTextArea from '../../components/TextArea/ResizingTextArea';

import Arrow_back_and from '../../assets/icon/Arrow_back_and';
import Arrow_back_ios from '../../assets/icon/Arrow_back_ios';
import Notifications_none from '../../assets/icon/Notifications_none';

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
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 3.36rem;
  /* max-width: 34rem; */
  word-break: keep-all;
`;

const SubTitle = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -2%;
  margin-top: 2.4rem;
  word-break: keep-all;
  color: #767676;
`;

const RotateItem = styled.div`
  font-weight: 800;
  font-size: 4.8rem;
  line-height: 5.76rem;
  letter-spacing: -1.5%;
  padding: 0.7rem 0;
  color: #70bb78;
`;

const ContentsArea = styled.div`
  flex: 1;
  align-content: stretch;
`;

const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex;
  margin-bottom: 1.6rem;
`;

const InfoText = styled.div`
  color: #767676;
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -2%;
`;

function ReservationPage({}: Props): ReactElement {
  const [openModal, setOpenModal] = useState(false);

  const FooterBtn = useMemo(() => {
    if (true) {
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
  }, []);

  return (
    <ReservationStyle>
      {openModal && <ReservationModal openHandler={setOpenModal} />}
      <ScreenHelmet
        customCloseButton={
          checkMobileType() === 'Android' ? (
            <Arrow_back_and fill="#3B3E41" />
          ) : (
            <Arrow_back_ios fill="#3B3E41" width="20" />
          )
        }
      />
      <Title>관악구에 이웃과 </Title>
      <RotateTitle>
        <RotateItem>새벽공부</RotateItem>
        <RotateItem>미라클모닝</RotateItem>
        <RotateItem>퇴근후수다</RotateItem>
        <RotateItem>육아수다</RotateItem>
      </RotateTitle>
      <Title>온라인에서 해볼까?</Title>
      <SubTitle>
        온라인으로 이웃과 함께 하는 모임 서비스를 오픈 준비 중이에요. 원하는
        모임이 있다면 적어주세요.
      </SubTitle>
      <ContentsArea>
        <ResizingTextArea
          placeholder={'이웃과 함께 하고 싶은 모임을 적어주세요.(선택)'}
        />
      </ContentsArea>
      <Footer>
        <Message>
          <Notifications_none fill="#767676" width="24" height="24" />
          <InfoText>알림 신청하고 이웃과 즐거운 시간을 보내보세요.</InfoText>
        </Message>
        {FooterBtn}
      </Footer>
    </ReservationStyle>
  );
}

export default ReservationPage;
