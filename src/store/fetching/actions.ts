import { IApiError } from '../../utils/constants/other';
import {
  FETCHING_FAILED,
  FETCHING_RESOURCE_REQUEST,
  FETCHING_SUCCESS,
  IFetchingFailed,
  IFetchingResourceRequest,
  IFetchingSuccess,
} from './types';

export const fetchingFailure = (resource: string, payload: IApiError): IFetchingFailed => ({
  type: FETCHING_FAILED,
  payload,
  resource,
});

export const fetchingRequest = (resource: string): IFetchingResourceRequest => ({
  type: FETCHING_RESOURCE_REQUEST,
  payload: null,
  resource,
});
export const fetchingSuccess = (resource: string): IFetchingSuccess => ({
  type: FETCHING_SUCCESS,
  payload: null,
  resource,
});
