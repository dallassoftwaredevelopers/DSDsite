import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setIsMatch(mediaQueryList.matches);

    mediaQueryList.onchange = (event) => {
      setIsMatch(event.matches);
    };
  }, [query]);

  return isMatch;
};

export default useMediaQuery;
