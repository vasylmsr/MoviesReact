import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { ErrorType } from 'store/helpers';

export default function useErrorNotificator(error: ErrorType) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [enqueueSnackbar, error]);
}
