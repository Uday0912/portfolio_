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
    <div className="fixed right-6 bottom-6 z-50">
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-accent shadow-lg text-white hover:bg-primary hover:shadow-xl active:scale-95 transition-all duration-300 border-2 border-white/80 backdrop-blur-sm"
        aria-label="Back to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default BackToTop; 