import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import { Dot } from '../../assets/icon';
import { COLOR } from '../../constant/color';

interface Props {
  text: string;
  className?: string;
}

function DescriptionItem({ text, className }: Props): ReactElement {
  return (
    <DescriptionWrapper
      className={classnames(className, 'description-list__contents')}
    >
      <DotIcon>
        <Dot />
      </DotIcon>
      <DescriptionText>{text}</DescriptionText>
    </DescriptionWrapper>
  );
}

const DescriptionWrapper = styled.div`
  font-size: 1.5rem;
  line-height: 2.5rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_GRAY};
  margin-bottom: 0.5rem;
  word-break: keep-all;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const DotIcon = styled.div`
  height: 2.7rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DescriptionText = styled.div`
  white-space: normal;
  position: relative;
  left: 0.8rem;
`;

export default DescriptionItem;
