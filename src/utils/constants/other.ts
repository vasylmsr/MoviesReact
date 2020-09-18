export const IDLE_STATUS = 'idle'; // fetching not started yet
export const LOADING_STATUS = 'loading'; // currently fetching the data
export const SUCCESS_STATUS = 'success'; // data fetched successfully
export const FAILURE_STATUS = 'failure'; // data failed to fetch
export type LoadingType = 'idle' | 'loading' | 'success' | 'failure';

export interface IApiError {
  code: string;
  message: string;
}
