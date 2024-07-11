import React, { createContext, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type LinearLoadingContextType = {
  isShow: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const LinearLoadingContext = createContext<
  LinearLoadingContextType | undefined
>(undefined);

export const LinearLoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState(false);

  const showLoading = () => setIsShow(true);
  const hideLoading = () => setIsShow(false);

  return (
    <LinearLoadingContext.Provider value={{ isShow, showLoading, hideLoading }}>
      {children}
      {isShow && (
        <Box
          sx={{
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        >
          <LinearProgress />
        </Box>
      )}
    </LinearLoadingContext.Provider>
  );
};

export const useLinearLoading = (): LinearLoadingContextType => {
  const context = useContext(LinearLoadingContext);
  if (!context) {
    throw new Error(
      'useLinearLoading must be used within a LinearLoadingProvider'
    );
  }
  return context;
};
