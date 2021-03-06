/** @jsx jsx */
import { ReactElement } from 'react';

import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { MEETING_DETAIL } from '../../../constant/message';
import { COLOR } from '../../../style/color';
import Modal from './Modal';

interface Props {
  open: boolean;
  closeHandler: () => void;
  className?: string;
}

function MeetingMannerModal({
  open,
  closeHandler,
  className,
}: Props): ReactElement {
  return (
    <ModalStyle
      open={open}
      className={classnames('meeting-guide-modal', className)}
      onClose={closeHandler}
      innerModalStyle={InnerModalStyle}
    >
      <ContentsWrapper>
        <Title className="meeting-guide-modal__title">
          {MEETING_DETAIL.MANNER.TITLE}
        </Title>
        {MEETING_DETAIL.MANNER.SUB_TITLE.map((el, idx) => {
          return (
            <GuideWrapper
              className="meeting-guide-modal__text"
              key={idx.toString()}
            >
              <SubTitle>
                <BoldText>{el.BOLD}</BoldText>
                {el.TEXT}
              </SubTitle>
            </GuideWrapper>
          );
        })}
      </ContentsWrapper>
      <ConfirmBtn
        className="meeting-guide-modal__confirm-btn"
        onClick={closeHandler}
      >
        {MEETING_DETAIL.MANNER.CLOSE}
      </ConfirmBtn>
    </ModalStyle>
  );
}

const ModalStyle = styled(Modal)`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 3rem 2.4rem;
`;

const InnerModalStyle = css`
  width: 100%;
  height: auto;
  max-height: 100%;
  margin: 0;
  padding: 0;
`;

const ContentsWrapper = styled.div`
  overflow-y: auto;
  color: ${COLOR.TEXT_GREY};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.03rem;
  line-height: 2.4rem;
  padding: 3rem 2rem 2.4rem 2rem;
`;

const Title = styled.div`
  text-align: center;
  color: ${COLOR.TEXT_BLACK};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.04rem;
  margin-bottom: 2rem;
`;

const GuideWrapper = styled.div`
  flex: 1;
  margin-bottom: 0.9rem;
`;

const SubTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.5rem;
  letter-spacing: -0.05rem;
  margin-bottom: 0.9rem;
  color: ${COLOR.TEXT_BLACK};
`;
const BoldText = styled(SubTitle)`
  color: ${COLOR.LIGHT_GREEN};
  font-weight: 600;
  margin: 0;
`;

const ConfirmBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 4.8rem;
  max-height: 4.8rem;
  flex: 1;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.07);
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
`;

export default MeetingMannerModal;
