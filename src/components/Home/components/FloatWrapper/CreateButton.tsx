import React from 'react';

import styled from '@emotion/styled';
import big_plus__white from '@icon/landingPage/big_plus__white.svg';
import { useNavigator } from '@karrotframe/navigator';

import { TOAST_DELAY } from '../../../../App';
import { useToastState } from '../../../../lib/Toast/util/toastContext';
import useMeetingDetail from '../../hook/useMeetingDetail';

function CreateButton({
  className,
}: {
  toastHandler?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  toastRef?: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const { push } = useNavigator();
  const toastState = useToastState();
  const hasToast = toastState.toasts.length > 0;
  const maxToastHeight = hasToast
    ? Math.max(...toastState.toasts.map(toast => toast.height))
    : 0;
  const { openMeetingDetail } = useMeetingDetail();

  return (
    <Wrapper>
      <CreateBtn
        className={className}
        toastState={hasToast}
        onClick={async () => {
          const popData: number | null = await push('/create');
          if (popData) openMeetingDetail(popData);
        }}
        yPos={maxToastHeight - 8}
      >
        <img src={big_plus__white} />
      </CreateBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: calc(100% - 9rem);
  left: calc(100% - 7.6rem);
  width: 0;
  height: 0;
  z-index: 1000;
  filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.1));
`;

const CreateBtn = styled.div<{
  yPos: number;
  toastState: boolean;
}>`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.$carrot500};

  display: flex;
  justify-content: center;
  align-items: center;

  transform: ${({ toastState, yPos }) =>
    toastState ? `translateY(-${yPos}px)` : 'translateY(0)'};
  transition-duration: ${({ toastState }) =>
    toastState ? `${TOAST_DELAY / 3}ms` : `${TOAST_DELAY / 3}ms`};
`;

export default React.memo(CreateButton);
