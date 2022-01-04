/** @jsx jsx */
import { useRef, useState } from 'react';

import { jsx, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../../style/color';
import useIntersectionObserver from './useIntersectionObserver';

interface Props {
  url: string;
  className?: string;
  inViewStyle?: SerializedStyles;
}

const ImageRenderer = ({ url, className, inViewStyle }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useIntersectionObserver(imgRef, () => !isLoaded && setIsInView(true));

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <ImageContainer
      className={classnames('image-container', className)}
      ref={imgRef}
    >
      {isInView && (
        <img
          css={inViewStyle}
          className={classnames('image', isLoaded)}
          src={url}
          onLoad={handleOnLoad}
        />
      )}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${COLOR.IMAGE_WRAPPER_BLACK};
`;

export default ImageRenderer;
