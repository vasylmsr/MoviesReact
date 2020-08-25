import { IApiError, LoadingType } from '../../../utils/constants/other';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';

export interface IRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: any;
}

export interface IRegisterFailure {
  type: typeof REGISTER_FAILURE;
  payload: IApiError;
}

export interface IRegisterRequest {
  type: typeof REGISTER_REQUEST;
  payload: any;
}

export interface IRegisterReducer {
  registerStatus: LoadingType;
  error: IApiError | null;
}

export type RegisterActionTypes = IRegisterRequest | IRegisterSuccess | IRegisterFailure;
