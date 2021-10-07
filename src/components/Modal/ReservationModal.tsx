/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import ReservationBtn from '../Button/ReservationBtn';
import Modal from './Modal';

interface Props {
  openHandler: React.Dispatch<
    React.SetStateAction<'success' | 'fail' | undefined>
  >;
  title: string;
  contents: string;
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

function ReservationModal({
  openHandler,
  title,
  contents,
}: Props): ReactElement {
  return (
    <Modal onClose={() => openHandler(undefined)}>
      <Title>{title}</Title>
      <Contents>{contents}</Contents>
      <ReservationBtnStyle text="확인" onClick={() => openHandler(undefined)} />
    </Modal>
  );
}

export default ReservationModal;
