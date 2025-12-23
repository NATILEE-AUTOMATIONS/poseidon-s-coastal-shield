import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ScrollContextType {
  zoomProgress: number;
  setZoomProgress: (value: number) => void;
  resetProgress: () => void;
  resetTrigger: number;
}

const ScrollContext = createContext<ScrollContextType>({
  zoomProgress: 0,
  setZoomProgress: () => {},
  resetProgress: () => {},
  resetTrigger: 0,
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [zoomProgress, setZoomProgress] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const resetProgress = useCallback(() => {
    setZoomProgress(0);
    setResetTrigger(prev => prev + 1);
  }, []);

  return (
    <ScrollContext.Provider value={{ zoomProgress, setZoomProgress, resetProgress, resetTrigger }}>
      {children}
    </ScrollContext.Provider>
  );
};
