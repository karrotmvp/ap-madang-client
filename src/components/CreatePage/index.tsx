import React, { useState } from 'react';

import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

import CustomScreenHelmet from '../common/CustomScreenHelmet';
import CircularProgress from '../common/Spinner/Circular-progress';
import Spinner from '../common/Spinner/SpinnerModal';
import Spacing from '../Home/components/Spacing';
import Description from './components/Description';
import MeetingTitle from './components/MeetingTitle';
import MeetingType from './components/MeetingType';
import Submit from './components/Submit';
import { fetchingStateType } from './useSubmit';

export type FormValues = {
  title: string;
  description: string;
  type: 'video' | 'audio';
};

function CreatePage() {
  const methods = useForm<FormValues>();
  const [loading, setLoading] = useState<fetchingStateType>('SUCCESS');

  return (
    <FormProvider {...methods}>
      <Spinner show={loading === 'LOADING'}>
        <CircularProgress />
      </Spinner>
      <Wrapper>
        <CustomScreenHelmet
          appendMiddle={<PageTitle>모임 만들기</PageTitle>}
          appendRight={<Spacing width="1.75rem" />}
        />
        <FormWrapper>
          <MeetingTitle />
          <Spacing height="3.2rem" />
          <MeetingType />
          <Spacing height="2rem" />
          <Description />
        </FormWrapper>
        <SubmitArea fetchStateSetter={setLoading} />
      </Wrapper>
    </FormProvider>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03em;
  box-sizing: border-box;
`;

const FormWrapper = styled.form`
  padding: 2.4rem 1.6rem 1.6rem 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const SubmitArea = styled(Submit)`
  width: 100%;
  height: auto;
`;

export default CreatePage;
