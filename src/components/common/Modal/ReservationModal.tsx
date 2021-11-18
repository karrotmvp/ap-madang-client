/** @jsx jsx */
import React, { ReactElement } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../../constant/color';
import ReservationBtn from '../../ReservationPage/components/ReservationBtn';
import Modal from './Modal';

interface Props {
  open: boolean;
  openHandler: React.Dispatch<React.SetStateAction<string | undefined>>;
  title: string;
  contents: string;
  className?: string;
}

function ReservationModal({
  openHandler,
  title,
  contents,
  className,
  open,
}: Props): ReactElement {
  return (
    <Modal
      open={open}
      className={classnames('reservation-modal', className)}
      onClose={() => openHandler(undefined)}
    >
      <Title>{title}</Title>
      <Contents>{contents}</Contents>
      <ReservationBtnStyle text="확인" onClick={() => openHandler(undefined)} />
    </Modal>
  );
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

export default ReservationModal;
