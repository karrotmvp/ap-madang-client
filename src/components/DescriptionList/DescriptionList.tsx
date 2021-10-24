import React from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import { Dot } from '../../assets/icon';
import { COLOR } from '../../constant/color';

interface DescriptionProp {
  text: string;
}

interface Props {
  title: string;
  data: DescriptionProp[] | undefined;
  className?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: 1.1rem;
`;

const List = styled.div`
  font-size: 1.5rem;
  line-height: 2.5rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_GRAY};
  margin-bottom: 3.4rem;

  li:last-child {
    margin-bottom: 0;
  }
`;

const DotIcon = styled.div`
  height: 2.3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DescriptionItem = styled.div`
  font-size: 1.5rem;
  line-height: 2.5rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_GRAY};
  margin-bottom: 0.5rem;
  word-break: keep-all;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    position: relative;
    left: 0.8rem;
  }
`;

export const DescriptionList = (props: Props) => {
  return (
    <Wrapper className={classnames('description-list', props.className)}>
      <DescriptionTitle className="description-list__title">
        {props.title}
      </DescriptionTitle>
      <List>
        {props.data &&
          props.data.map((el, idx) => (
            <DescriptionItem
              className="description-list__contents"
              key={idx.toString()}
            >
              <DotIcon>
                <Dot />
              </DotIcon>
              <span>{el.text}</span>
            </DescriptionItem>
          ))}
      </List>
    </Wrapper>
  );
};
