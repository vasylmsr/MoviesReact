import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';

export function useAsyncAction(callback: any, errorCallback?: any) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const execute = useCallback(
    async (data?: any) => {
      try {
        setLoading(true);
        await Promise.resolve(callback(data));
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
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
