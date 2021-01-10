import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMainLayoutLoading, stopMainLayoutLoading } from 'store/layout/slice';
import { FAILURE_STATUS, LOADING_STATUS, LoadingType, SUCCESS_STATUS } from 'utils/constants/other';

export default function useMainLayoutLoading(loadingStatus: LoadingType) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingStatus === LOADING_STATUS) {
      dispatch(startMainLayoutLoading());
    } else if (loadingStatus === SUCCESS_STATUS || loadingStatus === FAILURE_STATUS) {
      dispatch(stopMainLayoutLoading());
    }
  }, [dispatch, loadingStatus]);
}
