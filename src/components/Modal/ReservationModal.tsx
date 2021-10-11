/** @jsx jsx */
import React, { ReactElement } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

import { COLOR } from '../../constant/color';
import ReservationBtn from '../Button/ReservationBtn';
import Modal from './Modal';

interface Props {
  openHandler: React.Dispatch<React.SetStateAction<string | undefined>>;
  title: string;
  contents: string;
}

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
  font-size: 1.8rem;
  font-style: bold;
  font-weight: 700;
  letter-spacing: -0.03rem;
  line-height: 2.4rem;
`;

const Contents = styled.div`
  color: ${COLOR.TEXT_GRAY};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.03rem;
  line-height: 2.4rem;
`;

const ReservationBtnStyle = styled(ReservationBtn)`
  height: 44px;
  font-size: 1.6rem;
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
