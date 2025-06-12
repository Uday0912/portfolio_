import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 active:scale-95 transition-all duration-300"
        aria-label="Back to top"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BackToTop; 