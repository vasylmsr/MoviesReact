import { IApiError, LoadingType } from '../../../utils/constants/other';

export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST';
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
export const CHECK_USER_FAILURE = 'CHECK_USER_FAILURE';

export const LOGOUT = 'LOGOUT';

export interface IUserProfile {
  uid: string;
  firstName: string;
  lastName: string;
}

export interface IAuthReducer {
  user: IUserProfile | null;

  checkingUserStatus: LoadingType;
  checkingUserError: IApiError | null;
}

export interface ICheckingUserRequest {
  type: typeof CHECK_USER_REQUEST;
  payload: any;
}

export interface ICheckingUserFailure {
  type: typeof CHECK_USER_FAILURE;
  payload: any;
}

export interface ICheckingUserSuccess {
  type: typeof CHECK_USER_SUCCESS;
  payload: any;
}

export interface ILogout {
  type: typeof LOGOUT;
  payload: any;
}

export type UserActionsType =
  | ICheckingUserRequest
  | ICheckingUserFailure
  | ICheckingUserSuccess
  | ILogout;