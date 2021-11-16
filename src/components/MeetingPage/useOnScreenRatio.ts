import React, { useEffect, useState } from 'react';

const thresholdArr = Array.from({ length: 20 }, (_, idx) => {
  return parseFloat((1 / (idx + 1)).toFixed(3));
});

function useOnScreenRatio(
  rootRef: React.RefObject<HTMLDivElement>,
  ref: React.RefObject<HTMLDivElement>,
) {
  const [intersectingRatio, setIntersectingRatio] = useState(0);
  const intersectionOptions = {
    root: rootRef.current,
    rootMargin: '-80px 0px -80px 0px',
    threshold: thresholdArr,
  };
  const observer = new IntersectionObserver(
    ([entry]) =>
      setIntersectingRatio(parseFloat(entry.intersectionRatio.toFixed(2))),
    intersectionOptions,
  );

  useEffect(() => {
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);

  return intersectingRatio;
}

export default useOnScreenRatio;
