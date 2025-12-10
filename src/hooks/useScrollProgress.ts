import { useState, useEffect, useRef, RefObject } from 'react';

interface UseScrollProgressOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollProgress = (
  ref: RefObject<HTMLElement>,
  options: UseScrollProgressOptions = {}
): number => {
  const [progress, setProgress] = useState(0);
  const { threshold = 0, rootMargin = '0px' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the element
      // Start: when element top reaches viewport bottom
      // End: when element bottom reaches viewport top
      const scrollStart = elementHeight + viewportHeight;
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
  }, [ref, threshold, rootMargin]);

  return progress;
};

export default useScrollProgress;
