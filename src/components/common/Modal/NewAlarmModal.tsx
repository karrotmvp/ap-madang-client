import { ReactElement, useEffect } from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "classnames";

import { COLOR } from "../../../constant/color";
import { COMMON } from "../../../constant/message";
import Modal from "./Modal";

interface Props {
  open: boolean;
  closeHandler: () => void;
  className?: string;
}

function NewAlarmModal({ closeHandler, className, open }: Props): ReactElement {
  useEffect(() => {
    const closeModal = setTimeout(() => {
      closeHandler();
    }, 1200);
    return () => {
      clearTimeout(closeModal);
    };
  }, [closeHandler]);

  return (
    <Modal
      open={open}
      className={classnames("new-alarm-modal", className)}
      innerModalStyle={InnerModalStyle}
    >
      <ContentsWrapper className="new-alarm-modal__contents body3">
        {COMMON.NEW_ALARM_MODAL.TEXT}
      </ContentsWrapper>
    </Modal>
  );
}

const InnerModalStyle = css`
  width: 100%;
  height: auto;
  padding: 2rem 0;
`;

const ContentsWrapper = styled.div`
  text-align: center;
  color: ${COLOR.TEXT_BLACK};
  letter-spacing: -0.03rem;
`;

export default NewAlarmModal;
