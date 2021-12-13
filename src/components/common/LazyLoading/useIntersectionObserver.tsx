import React, { useEffect } from 'react';

const useIntersectionObserver = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  const intersectionOptions = {
    rootMargin: '100px',
    threshold: 0.15,
  };

  const observer = new IntersectionObserver(
    handleIntersections,
    intersectionOptions,
  );
  function handleIntersections(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        callback();
      }
    });
  }

  useEffect(() => {
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);
};

export default useIntersectionObserver;
