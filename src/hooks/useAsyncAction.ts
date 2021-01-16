import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { AnyFunction } from 'utils/types';

export function useAsyncAction(successCallback: AnyFunction, errorCallback?: AnyFunction) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const execute = useCallback(
    async (...data: any[]) => {
      try {
        setLoading(true);
        await Promise.resolve(successCallback(...data));
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        if (errorCallback) {
          errorCallback();
        }
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
