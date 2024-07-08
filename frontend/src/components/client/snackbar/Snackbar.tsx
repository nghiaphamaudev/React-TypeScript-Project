import React, { ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

type SnackbarType = 'success' | 'error' | 'warning' | 'info' | undefined;

type SnackbarContextType = {
  showSnackbar: (type: SnackbarType, message: string) => void;
};

const SnackbarContext = React.createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<SnackbarType>(undefined);
  const [message, setMessage] = React.useState('');

  const showSnackbar = (
    snackbarType: SnackbarType,
    snackbarMessage: string
  ) => {
    setType(snackbarType);
    setMessage(snackbarMessage);
    setOpen(() => true);
  };

  const handleClose = () => {
    setOpen(() => false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={type} variant="filled" onClose={handleClose}>
          <AlertTitle>
            {type?.replace(type[0], type[0].toUpperCase())}
          </AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
