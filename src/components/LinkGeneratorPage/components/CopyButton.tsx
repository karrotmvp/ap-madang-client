import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useRecoilValue } from 'recoil';

import { analytics } from '../../../App';
import icon_check from '../../../assets/icon/linkGenerator/icon_check.svg';
import icon_copy from '../../../assets/icon/linkGenerator/icon_copy.svg';
import { userInfoAtom } from '../../../store/user';
import IconButton from './IconButton';

interface Props {
  url: string;
  copySuccess: boolean;
  onCopySuccess: () => void;
}

function CopyButton({ url, copySuccess, onCopySuccess }: Props): ReactElement {
  const userInfo = useRecoilValue(userInfoAtom);
  const onClickHandler = () => {
    logEvent(analytics, 'copy_link__click', {
      user_nickname: userInfo?.nickname,
      user_region: userInfo?.region,
    });
    const textField = document.createElement('textarea');
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    onCopySuccess();
  };

  return (
    <Wrapper>
      <IconTextButton>
        <IconButtonStyle
          copySuccess={copySuccess}
          show={copySuccess}
          icon={icon_check}
          text={'모임방 링크 복사완료'}
        />
        <IconButtonStyle
          onClick={onClickHandler}
          copySuccess={copySuccess}
          show={!copySuccess}
          icon={icon_copy}
          text={'모임방 링크 복사하기'}
        />
      </IconTextButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 3.7rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1.6rem;
`;

const IconTextButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
`;

const IconButtonStyle = styled(IconButton)<{ copySuccess: boolean }>`
  color: ${({ copySuccess }) => (copySuccess ? '#9B9B9B' : '#0C7EAB')};
  will-change: color;
  transition: color 0.2s ease-in-out;
`;

export default CopyButton;
