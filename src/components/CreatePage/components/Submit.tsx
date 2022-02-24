import React from 'react';

import PrimaryButton from '@components/common/PrimaryButton';
import styled from '@emotion/styled';
import useMini from '@hook/useMini';
import { useCurrentScreen, useNavigator } from '@karrotframe/navigator';
import { useFormContext } from 'react-hook-form';

import { FormValues } from '..';
import useSubmit, { fetchingStateType } from '../useSubmit';

type Props = {
  className?: string;
  fetchStateSetter: React.Dispatch<React.SetStateAction<fetchingStateType>>;
};

function Submit({ className, fetchStateSetter }: Props) {
  const { handleSubmit } = useFormContext<FormValues>();
  const { submitHandler } = useSubmit({ fetchStateSetter });
  const { pop, replace } = useNavigator();
  const { isRoot } = useCurrentScreen();
  const { loginWithMini } = useMini();

  const submit = async (data: FormValues) =>
    loginWithMini(async () => {
      const createdMeetingId = await submitHandler(data);
      if (createdMeetingId) {
        if (!isRoot) pop().send(createdMeetingId);
        else replace(`/?meeting=${createdMeetingId}`);
      }
    });

  return (
    <SubmitArea className={className}>
      <SubmitButton onClick={handleSubmit(submit)}>모임 만들기</SubmitButton>
    </SubmitArea>
  );
}

const SubmitArea = styled.div`
  padding: 0.8rem 1.6rem;
  box-sizing: border-box;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.07);
`;

const SubmitButton = styled(PrimaryButton)`
  width: auto;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.02em;
`;

export default Submit;
