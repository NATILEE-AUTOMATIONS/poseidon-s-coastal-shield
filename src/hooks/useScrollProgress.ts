import { useState, useEffect, RefObject } from 'react';

export const useScrollProgress = (
  ref: RefObject<HTMLElement>,
  resetTrigger: number = 0
): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the element
      const scrollDistance = elementHeight;
      
      // Current position relative to scroll start
      const currentPosition = viewportHeight - rect.top;
      
      // Calculate progress (0 to 1)
      const rawProgress = currentPosition / scrollDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(clampedProgress);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref, resetTrigger]);

  return progress;
};

export default useScrollProgress;
