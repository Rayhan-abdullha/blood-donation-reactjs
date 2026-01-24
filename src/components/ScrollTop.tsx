import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to top-left of the page
  }, [pathname]); // runs every time the path changes

  return null; // this component doesn't render anything
};

export default ScrollToTop;
