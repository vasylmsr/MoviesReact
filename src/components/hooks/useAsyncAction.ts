import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';

export function useAsyncAction(callback: any, errorCallback?: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const execute = useCallback(
    async (...data) => {
      try {
        setLoading(true);
        await Promise.resolve(callback(...data));
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        // eslint-disable-next-line no-unused-expressions
        errorCallback && errorCallback();
      } finally {
        setLoading(false);
      }
    },
    [callback, enqueueSnackbar, errorCallback],
  );

  return {
    execute,
    loading,
  };
}
