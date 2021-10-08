/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { mini } from '../../App';
import {
  DEV_APP_ID,
  MINI_PRESET_URL_DEV,
  MINI_PRESET_URL_PROD,
  PROD_APP_ID,
} from '../../config/env.dev';
import { alarmReservation, getRegionName } from '../../api/reservation';

import ReservationBtn from '../../components/Button/ReservationBtn';
import ReservationModal from '../../components/Modal/ReservationModal';
import RotateTitle from '../../components/Title/RotateTitle';
import EditableInput from '../../components/Input/EditableInput';
import NavBar from '../../components/NavBar/NavBar';
import { RESERVATION } from '../../constant/message';
import { COLOR } from '../../constant/color';

import styled from '@emotion/styled';
import { Notifications_none } from '../../assets/icon';
import '@karrotframe/navigator/index.css';
import { getRegionId } from '../../util/utils';
import Spinner from '../../components/Spinner/Spinner';

const ReservationPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestionForm, setSuggestionForm] = useState<string>('');
  const [regionName, setRegionName] = useState<string>('');

  const cookies = new Cookies();
  const regionId = getRegionId(location.search);

  const fetchRegionName = async () => {
    setLoading(true);
    const result = await getRegionName({
      region_id: regionId,
    });
    if (result.success && result.data) setRegionName(result.data.region);
    setLoading(false);
  };

  useEffect(() => {
    fetchRegionName();
  }, []);

  const reservationEventHandler = useCallback(() => {
    mini.startPreset({
      preset:
        process.env.NODE_ENV === 'development'
          ? MINI_PRESET_URL_DEV
          : MINI_PRESET_URL_PROD,
      params: {
        appId:
          process.env.NODE_ENV === 'development' ? DEV_APP_ID : PROD_APP_ID,
      },
      onSuccess: async function (result) {
        if (result && result.code) {
          setLoading(true);
          let apiResult = await alarmReservation({
            code: result.code,
            region_id: regionId,
            suggestion: suggestionForm,
          });
          if (apiResult.success) {
            cookies.set(RESERVATION.COOKIE_NAME, true, {
              expires: new Date(RESERVATION.COOKIE_EXPIRE_DATE),
            });
            setOpenModal(RESERVATION.SUCCESS);
          }
          if (!apiResult.success) setOpenModal(RESERVATION.FAIL);
          setLoading(false);
        }
      },
      onFailure: function () {
        setOpenModal(RESERVATION.FAIL);
      },
    });
  }, [regionId, suggestionForm]);

  const ReservationButton = useMemo(() => {
    if (!cookies.get(RESERVATION.COOKIE_NAME))
      return (
        <ReservationBtn
          onClick={reservationEventHandler}
          text={RESERVATION.BTN_TEXT}
        />
      );
    return <ReservationBtn disabled text={RESERVATION.DISABLE_BTN_TEXT} />;
  }, [cookies]);

  const InputForm = useMemo(() => {
    if (!cookies.get(RESERVATION.COOKIE_NAME))
      return (
        <EditableInput
          contentEditable
          formHandler={setSuggestionForm}
          placeholder={RESERVATION.INPUT_PLACEHOLDER}
        />
      );
    return <EditableInput placeholder={RESERVATION.DONE_PLACEHOLDER} />;
  }, [cookies]);

  const Modal = useMemo(() => {
    if (openModal === RESERVATION.SUCCESS)
      return (
        <ReservationModal
          openHandler={setOpenModal}
          title={RESERVATION.MODAL.SUCCESS_TITLE}
          contents={RESERVATION.MODAL.SUCCESS_TEXT}
        />
      );
    return (
      <ReservationModal
        openHandler={setOpenModal}
        title={RESERVATION.MODAL.FAIL_TITLE}
        contents={RESERVATION.MODAL.FAIL_TEXT}
      />
    );
  }, [openModal]);

  return (
    <PageWrapper>
      <NavBar />
      <ReservationStyle>
        {loading && <Spinner />}
        {openModal && Modal}
        <Title>{regionName + ' ' + RESERVATION.TITLE1}</Title>
        <RotateTitle items={RESERVATION.ROTATE_TITLE} intervalTime={1300} />
        <Title>{RESERVATION.TITLE2}</Title>
        <SubTitle>{RESERVATION.SUB_TITLE}</SubTitle>
        <ContentsArea>{InputForm}</ContentsArea>
        <Footer>
          <Message>
            <Notifications_none fill={COLOR.TEXT_GRAY} width="24" height="24" />
            <InfoText>{RESERVATION.INFO_TEXT}</InfoText>
          </Message>
          {ReservationButton}
        </Footer>
      </ReservationStyle>
    </PageWrapper>
  );
};

export default ReservationPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ReservationStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  height: 100%;
  padding: 2.4rem 2.4rem 1.6rem 2.4rem;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 3.36rem;
  letter-spacing: -0.06rem;
  word-break: keep-all;
`;

const SubTitle = styled.div`
  color: ${COLOR.TEXT_GRAY};
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03rem;
  margin-top: 2.4rem;
  word-break: keep-all;
`;

const ContentsArea = styled.div`
  flex: 1;
  align-content: stretch;
`;

const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const InfoText = styled.div`
  color: ${COLOR.TEXT_GRAY};
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03rem;
  margin-left: 0.2rem;
`;
