import React, { useRef, useState } from 'react';

import classnames from 'classnames';

import useIntersectionObserver from './useIntersectionObserver';

interface Props {
  url: string;
  thumb: string;
  className?: string;
}

const ImageRenderer = ({ url, thumb, className }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useIntersectionObserver(imgRef, () => !isLoaded && setIsInView(true));

  const handleOnLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        width: '100%',
      }}
    >
      {isInView && (
        <>
          <img
            className={classnames(className, 'image', 'thumb', {
              ['isLoaded']: !!isLoaded,
            })}
            src={thumb}
          />
          <img
            className={classnames(className, 'image', {
              ['isLoaded']: !!isLoaded,
            })}
            src={url}
            onLoad={handleOnLoad}
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
