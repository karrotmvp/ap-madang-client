/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import ReservationBtn from '../Button/ReservationBtn';
import Modal from './Modal';

interface Props {
  openHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const Title = styled.div`
  color: #111111;
  font-size: 1.8rem;
  font-style: bold;
  font-weight: 700;
  letter-spacing: -1.5%;
  line-height: 2.4rem;
`;

const Contents = styled.div`
  color: #767676;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -1.5%;
  line-height: 2.4rem;
`;

const ReservationBtnStyle = styled(ReservationBtn)`
  height: 44px;
`;

function ReservationModal({ openHandler }: Props): ReactElement {
  return (
    <Modal onClose={() => openHandler(false)}>
      <Title>알림받기 완료</Title>
      <Contents>
        알림 신청이 완료되었어요. 온라인 모임이 열리면 알려드릴게요.
      </Contents>
      <ReservationBtnStyle text="확인" onClick={() => openHandler(false)} />
    </Modal>
  );
}

export default ReservationModal;
