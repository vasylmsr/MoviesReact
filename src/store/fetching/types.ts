import { IApiError } from '../../utils/constants/other';

type FetchingResource = 'posts' | 'post' | 'addPost';

export const FETCHING_RESOURCE_REQUEST = 'FETCHING_RESOURCE_REQUEST';
export const FETCHING_FAILED = 'FETCHING_FAILED';
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS';

export interface IFetchingResourceRequest {
  type: typeof FETCHING_RESOURCE_REQUEST;
  resource: string;
  payload: null;
}

export interface IFetchingFailed {
  type: typeof FETCHING_FAILED;
  resource: string;
  payload: IApiError;
}

export interface IFetchingSuccess {
  type: typeof FETCHING_SUCCESS;
  resource: string;
  payload: null;
}

export type FetchingActions = IFetchingResourceRequest | IFetchingFailed | IFetchingSuccess;
