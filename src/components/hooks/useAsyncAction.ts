import { useState } from 'react';
import { useSnackbar } from 'notistack';

export function useAsyncAction(callback: any, errorCallback = () => {}) {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  async function execute(data: any) {
    try {
      setLoading(true);
      await Promise.resolve(callback(data));
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      errorCallback();
    } finally {
      setLoading(false);
    }
  }

  return {
    execute,
    loading,
  };
}
