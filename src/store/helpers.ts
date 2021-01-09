import {
  FAILURE_STATUS,
  IFirebaseApiError,
  IDLE_STATUS,
  LOADING_STATUS,
  LoadingType,
  SUCCESS_STATUS,
} from 'utils/constants/other';
import { ITmdbError } from 'api/axios/theMovieDb/types';

export type ErrorType = IFirebaseApiError | ITmdbError | null;

export const setFetchingRequest = (state: any) => {
  state.status = LOADING_STATUS;
  state.error = null;
};
export const setFetchingSuccess = (state: any) => {
  state.status = SUCCESS_STATUS;
  state.error = null;
};
export const setFetchingError = (state: any, error: ErrorType) => {
  state.status = FAILURE_STATUS;
  state.error = error;
};
export const clearState = (state: any) => {
  state.status = IDLE_STATUS;
  state.error = null;
};

export type StatusType<T = {}> = T & {
  status: LoadingType;
  error: ErrorType;
};

export const getStatusObj = (additionalParams = {}): StatusType => ({
  status: IDLE_STATUS,
  error: null,
  ...additionalParams,
});
