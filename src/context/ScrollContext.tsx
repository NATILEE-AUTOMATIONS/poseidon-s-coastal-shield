import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ScrollContextType {
  zoomProgress: number;
  setZoomProgress: (value: number) => void;
  resetProgress: () => void;
}

const ScrollContext = createContext<ScrollContextType>({
  zoomProgress: 0,
  setZoomProgress: () => {},
  resetProgress: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [zoomProgress, setZoomProgress] = useState(0);

  const resetProgress = useCallback(() => {
    setZoomProgress(0);
  }, []);

  return (
    <ScrollContext.Provider value={{ zoomProgress, setZoomProgress, resetProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};
