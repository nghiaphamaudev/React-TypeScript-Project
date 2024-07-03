import * as React from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

interface MyAppProps {
  message: string | undefined;
  variant: VariantType;
}

function MyApp({ message, variant }: MyAppProps) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (
    variant: VariantType,
    message: string | undefined
  ) => {
    if (message) {
      enqueueSnackbar(message, { variant });
    }
  };

  // Sử dụng useEffect để hiển thị snackbar ngay khi component mount
  React.useEffect(() => {
    handleClickVariant(variant, message);
  }, [enqueueSnackbar, message, variant]);

  return null;
}

interface SnackMessageProps {
  message: string | undefined;
  variant: VariantType;
}

export default function SnackMessage({ message, variant }: SnackMessageProps) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      maxSnack={3}
    >
      <MyApp message={message} variant={variant} />
    </SnackbarProvider>
  );
}
