// hooks/usePageTitle.js
import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `TiTON | ${title}`;
  }, [title]);
};

export default usePageTitle;