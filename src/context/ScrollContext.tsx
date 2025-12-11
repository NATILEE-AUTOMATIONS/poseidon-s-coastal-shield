import { createContext, useContext, useState, ReactNode } from 'react';

interface ScrollContextType {
  zoomProgress: number;
  setZoomProgress: (value: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  zoomProgress: 0,
  setZoomProgress: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [zoomProgress, setZoomProgress] = useState(0);

  return (
    <ScrollContext.Provider value={{ zoomProgress, setZoomProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};
