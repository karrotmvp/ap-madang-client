/** @jsx jsx */
import { useState, useMemo, useCallback, useEffect } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Cookies } from 'react-cookie';

import { alarmReservation, getRegionName } from '../../api/reservation';
import { mini } from '../../App';
import { NotificationsNone } from '../../assets/icon';
import ReservationBtn from '../../components/Button/ReservationBtn';
import EditableInput from '../../components/Input/EditableInput';
import ReservationModal from '../../components/Modal/ReservationModal';
import NavBar from '../../components/NavBar/NavBar';
import Spinner from '../../components/Spinner/Spinner';
import RotateTitle from '../../components/Title/RotateTitle';
import { COLOR } from '../../constant/color';
import { RESERVATION } from '../../constant/message';
import '@karrotframe/navigator/index.css';
import { getRegionId } from '../../util/utils';

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

const Footer = styled.footer`
  width: 100%;
  box-sizing: border-box;
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const NotiIcon = styled(NotificationsNone)`
  margin-right: 0.2rem;
`;

const InfoText = styled.div`
  color: ${COLOR.TEXT_GRAY};
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03rem;
  margin-left: 0.4rem;
  word-break: keep-all;
`;
const ReservationPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestionForm, setSuggestionForm] = useState<string>('');
  const [regionName, setRegionName] = useState<string>('');

  const cookies = new Cookies();
  const regionId = getRegionId(location.search);

  const fetchRegionName = useCallback(async () => {
    setLoading(true);
    const result = await getRegionName({
      region_id: regionId,
    });
    if (result.success && result.data) setRegionName(result.data.region);
    setLoading(false);
  }, [regionId]);

  useEffect(() => {
    fetchRegionName();
  }, [fetchRegionName]);

  const reservationEventHandler = useCallback(() => {
    mini.startPreset({
      preset: process.env.MINI_PRESET_URL || '',
      params: {
        appId: process.env.APP_ID || '',
      },
      async onSuccess(result) {
        if (result && result.code) {
          setLoading(true);
          const apiResult = await alarmReservation({
            code: result.code,
            regionId,
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
      onFailure() {
        setOpenModal(RESERVATION.FAIL);
      },
    });
  }, [cookies, regionId, suggestionForm]);

  const ReservationButton = useMemo(() => {
    if (!cookies.get(RESERVATION.COOKIE_NAME))
      return (
        <ReservationBtn
          onClick={reservationEventHandler}
          text={RESERVATION.BTN_TEXT}
        />
      );
    return <ReservationBtn disabled text={RESERVATION.DISABLE_BTN_TEXT} />;
  }, [cookies, reservationEventHandler]);

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
    <PageWrapper className="reservation">
      <NavBar />
      <ReservationStyle>
        {loading && <Spinner />}
        {openModal && Modal}
        <header>
          <Title>{`${regionName} ${RESERVATION.TITLE1}`}</Title>
          <RotateTitle items={RESERVATION.ROTATE_TITLE} intervalTime={1300} />
          <Title>{RESERVATION.TITLE2}</Title>
          <SubTitle>{RESERVATION.SUB_TITLE}</SubTitle>
        </header>
        <ContentsArea>{InputForm}</ContentsArea>
        <Footer>
          {!cookies.get(RESERVATION.COOKIE_NAME) && (
            <Message>
              <NotiIcon fill={COLOR.TEXT_GRAY} width="24" height="24" />
              <InfoText>{RESERVATION.INFO_TEXT}</InfoText>
            </Message>
          )}
          {ReservationButton}
        </Footer>
      </ReservationStyle>
    </PageWrapper>
  );
};

export default ReservationPage;
