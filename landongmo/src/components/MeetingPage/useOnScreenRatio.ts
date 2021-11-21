import React, { useEffect, useMemo, useState } from "react";

const thresholdArr = Array.from({ length: 100 }, (_, idx) => {
  return parseFloat((1 / (idx + 1)).toFixed(3));
}).reverse();

function useOnScreenRatio(
  rootRef: React.RefObject<HTMLDivElement>,
  ref: React.RefObject<HTMLDivElement>
) {
  const [intersectingRatio, setIntersectingRatio] = useState(0);
  const intersectionOptions = useMemo(() => {
    return {
      root: rootRef.current,
      rootMargin: "-67px 0px -120px 0px",
      threshold: thresholdArr,
    };
  }, [rootRef]);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) =>
          setIntersectingRatio(parseFloat(entry.intersectionRatio.toFixed(2))),
        intersectionOptions
      ),
    [intersectionOptions]
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
