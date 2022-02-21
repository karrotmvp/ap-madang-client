import React, { useCallback } from 'react';

import { createMeetings } from '@api/v2/meeting';

import { FormValues } from '.';

export type fetchingStateType = 'LOADING' | 'SUCCESS' | 'ERROR';

function useSubmit({
  fetchStateSetter,
}: {
  fetchStateSetter?: React.Dispatch<React.SetStateAction<fetchingStateType>>;
}) {
  const stateUpdate = useCallback(
    (state: fetchingStateType) => {
      fetchStateSetter && fetchStateSetter(state);
    },
    [fetchStateSetter],
  );

  const submitHandler = useCallback(
    async (value: FormValues) => {
      stateUpdate('LOADING');
      const result = await createMeetings(value);
      if (result.success && result.data) {
        stateUpdate('SUCCESS');
        return result.data.id;
      } else stateUpdate('ERROR');
      return undefined;
    },
    [stateUpdate],
  );

  return { submitHandler };
}

export default useSubmit;
