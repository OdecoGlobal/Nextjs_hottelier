import { useEffect, useState } from 'react';

export const useRangeSize = () => {
  const [rangeSize, setRangeSize] = useState(7);

  useEffect(() => {
    const updateRange = () => {
      const width = window.innerWidth;
      if (width < 350) setRangeSize(1);
      else if (width < 480) setRangeSize(2);
      else if (width < 768) setRangeSize(3);
      else if (width < 1024) setRangeSize(5);
      else setRangeSize(7);
    };

    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  return rangeSize;
};
