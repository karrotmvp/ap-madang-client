import React from 'react';

import PrimaryButton from '@components/common/PrimaryButton';
import styled from '@emotion/styled';

function CloseMeetingButton() {
  return <DisableButton>종료된 모임이에요</DisableButton>;
}

const DisableButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.colors.$gray300};
`;

export default CloseMeetingButton;
