import { useState } from 'react';
import { useSnackbar } from 'notistack';

export function useAsyncAction(callback = () => {}, errorCallback = () => {}) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function fullFunction() {
    try {
      setLoading(true);
      await Promise.resolve(callback);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      errorCallback();
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    fullFunction,
  };
}
