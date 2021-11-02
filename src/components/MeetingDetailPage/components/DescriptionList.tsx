import React from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../../constant/color';
import DescriptionItem from '../../common/DescriptionItem';

interface DescriptionProp {
  text: string;
}

interface Props {
  title: string;
  data: DescriptionProp[] | undefined;
  className?: string;
}

const DescriptionList = (props: Props) => {
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
              text={el.text}
            />
          ))}
      </List>
    </Wrapper>
  );
};

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

export default DescriptionList;
