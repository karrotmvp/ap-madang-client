import React from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import green_face_happy from '../../../assets/icon/detailPage/green_face_happy.svg';
import { COLOR } from '../../../style/color';
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
        <Icon src={green_face_happy} />
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

const Icon = styled.img`
  margin-right: 0.6rem;
`;

const DescriptionTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const List = styled.div`
  font-size: 1.5rem;
  line-height: 2.5rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_GREY};
  margin-bottom: 3.2rem;

  li:last-child {
    margin-bottom: 0;
  }
`;

export default DescriptionList;
