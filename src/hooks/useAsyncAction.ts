import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';

export function useAsyncAction(successCallback: (...args: any[]) => any, errorCallback?: any) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const execute = useCallback(
    async (...data) => {
      try {
        setLoading(true);
        await Promise.resolve(successCallback(...data));
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        // eslint-disable-next-line no-unused-expressions
        errorCallback && errorCallback();
      } finally {
        setLoading(false);
      }
    },
    [successCallback, enqueueSnackbar, errorCallback],
  );

  return {
    execute,
    loading,
  };
}
