import React, { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { generateShortLink } from '../../api/meeting';
import speaker from '../../assets/icon/linkGenerator/speaker.svg';
import link_generator_guide from '../../assets/image/link_generator_guide.png';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import { COLOR } from '../../style/color';
import CircularProgress from '../common/Circular-progress';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Spinner from '../common/SpinnerModal';
import LinkBottomSheet from './components/LinkBottomSheet';
import PrimaryButton from './components/PrimaryButton';

function LinkGeneratorPage(): ReactElement {
  const [openLinkBottomSheet, setOpenLinkBottomSheet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { loginWithMini } = useMini();
  const userInfo = useRecoilValue(userInfoAtom);

  const onClickGenerateLink = async () => {
    setLoading(true);
    const result = await generateShortLink();

    if (result.success && result.data) {
      setUrl(result.data.short_url);
      setOpenLinkBottomSheet(true);
      setLoading(false);
    }
    setOpenLinkBottomSheet(true);
  };

  useEffect(() => {
    loginWithMini();
  }, [loginWithMini]);

  return (
    <Container>
      <CustomScreenHelmet />

      <Spinner show={loading}>
        <CircularProgress />
      </Spinner>
      {openLinkBottomSheet && (
        <LinkBottomSheet
          onClose={() => setOpenLinkBottomSheet(false)}
          open={openLinkBottomSheet}
          url={url}
        />
      )}
      <Wrapper>
        <TopBanner>
          <SpeakerImage src={speaker} />
          {userInfo?.nickname && (
            <UserNameWrapper>
              <UserName>{userInfo.nickname}</UserName>님의
            </UserNameWrapper>
          )}
          <Title>
            <OrangeTitle>음성 모임방</OrangeTitle>을
            <br />
            만들어드려요
          </Title>
        </TopBanner>
        <GuideImage src={link_generator_guide} />
      </Wrapper>
      <FloatButtonWrapper>
        <PrimaryButton onClick={() => loginWithMini(onClickGenerateLink)}>
          모임방 만들기
        </PrimaryButton>
      </FloatButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const TopBanner = styled.div`
  padding: 6rem 3.2rem;
  background: #fcf5ee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpeakerImage = styled.img``;

const UserNameWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  font-family: 'HGSoftGGothicssi_Pro_80g';
  font-size: 2.6rem;
  line-height: 125%;
  text-align: center;
  letter-spacing: -0.02rem;
  color: #4d5159;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  font-family: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`;

const Title = styled.span`
  margin-top: 0.4rem;
  font-size: 4rem;
  line-height: 120%;
  text-align: center;
  letter-spacing: -0.02rem;
  font-family: 'HGSoftGGothicssi_Pro_99g';
  color: #4d5159;
`;

const OrangeTitle = styled(Title)`
  color: #fe8745;
`;

const GuideImage = styled.img`
  width: 100%;
`;

const FloatButtonWrapper = styled.div`
  max-height: 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

export default LinkGeneratorPage;
