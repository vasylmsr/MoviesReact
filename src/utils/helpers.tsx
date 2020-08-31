interface IHandleAsyncActionParams {
  callback: Function;
  setLoading?: Function;
  enqueueSnackbar: Function;
  errorCallback?: Function;
}

export const handleAsyncAction = async ({
  callback,
  setLoading = () => {},
  enqueueSnackbar,
  errorCallback = () => {},
}: IHandleAsyncActionParams) => {
  try {
    setLoading(true);
    await callback();
  } catch (error) {
    enqueueSnackbar(error.message, { variant: 'error' });
    errorCallback();
  } finally {
    setLoading(false);
  }
};

export const toUpperFirstLetter = (str: string = ''): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
