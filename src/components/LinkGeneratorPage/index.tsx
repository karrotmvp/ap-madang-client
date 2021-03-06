import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useRecoilValue } from 'recoil';

import { generateShortLink } from '../../api/meeting';
import { analytics } from '../../App';
import speaker from '../../assets/icon/linkGenerator/speaker.svg';
import link_generator_guide from '../../assets/image/link_generator_guide.png';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import { COLOR } from '../../style/color';
import mini from '../../util/mini';
import { getQueryString } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import PrimaryButton from '../common/PrimaryButton';
import CircularProgress from '../common/Spinner/Circular-progress';
import Spinner from '../common/Spinner/SpinnerModal';
import LinkBottomSheet from './components/LinkBottomSheet';

function LinkGeneratorPage(): ReactElement {
  const [openLinkBottomSheet, setOpenLinkBottomSheet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { loginWithMini } = useMini();
  const userInfo = useRecoilValue(userInfoAtom);

  const goBackHandler = useCallback((e?) => {
    e?.preventDefault();
    e?.stopPropagation();
    const sharedRef = getQueryString(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'shared',
    );
    if (sharedRef) mini.close();
    mini.close();
  }, []);

  const onClickGenerateLink = useCallback(async () => {
    logEvent(analytics, 'link_gen_btn__click', {
      user_nickname: userInfo?.nickname,
      user_region: userInfo?.region,
    });
    setLoading(true);
    const result = await generateShortLink();

    if (result.success && result.data) {
      setUrl(
        `${process.env.CLIENT_URL}/?#/short?share_code=${result.data.share_code}`,
      );
      setOpenLinkBottomSheet(true);
      setLoading(false);
    }
    setOpenLinkBottomSheet(true);
  }, [userInfo]);

  useEffect(() => {
    logEvent(analytics, 'link_gen_page__show');
  }, []);

  return (
    <Container>
      <CustomScreenHelmet
        onCustomBackButton={goBackHandler}
        onCustomCloseButton={goBackHandler}
      />

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
          <Title>
            ?????? ?????????
            <br />
            <OrangeTitle>????????????</OrangeTitle>
            <br />
            ?????????????????????
          </Title>
        </TopBanner>
        <GuideImage src={link_generator_guide} />
      </Wrapper>
      <FloatButtonWrapper>
        <PrimaryButton onClick={() => loginWithMini(onClickGenerateLink)}>
          ????????? ?????????
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

const Title = styled.span`
  margin-top: 2rem;
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
