import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { COLOR } from '../../../constant/color';
import { MEETING_DETAIL } from '../../../constant/message';
import { codeAtom, userInfoAtom, UserInfoType } from '../../../store/user';
import { authHandler } from '../../../util/withMini';

interface Props {
  onClickJoinHandler: (
    userInfo: UserInfoType,
  ) => (e?: React.MouseEvent) => void;
}

function Footer({ onClickJoinHandler }: Props): ReactElement {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const setCode = useSetRecoilState(codeAtom);

  return (
    <FooterWrapper className="meeting-detail__footer-nav-bar">
      <JoinBtn
        onClick={
          !userInfo
            ? authHandler(
                onClickJoinHandler,
                setCode,
                setUserInfo,
                'detail_page_join',
              )
            : onClickJoinHandler(userInfo)
        }
      >
        {MEETING_DETAIL.JOIN_NOW}
      </JoinBtn>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  max-height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

const JoinBtn = styled.div`
  flex: 1;
  height: 4.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  background-color: ${COLOR.LIGHT_GREEN};
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9rem;
  text-align: center;
  letter-spacing: -0.03rem;

  color: ${COLOR.TEXT_WHITE};

  text-decoration: none;
  outline: none;

  &:hover,
  &:active {
    text-decoration: none;
    color: ${COLOR.TEXT_WHITE};
  }
`;

export default Footer;
