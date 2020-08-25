import { IApiError, LoadingType } from '../../../utils/constants/other';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST';
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
export const CHECK_USER_FAILURE = 'CHECK_USER_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export interface IUserProfile {
  uid: string;
  firstName: string;
  lastName: string;
}

export interface IAuthReducer {
  user: IUserProfile | null;

  isAuthenticated: boolean;

  loginStatus: LoadingType;
  loginError: IApiError | null;

  checkingUserStatus: LoadingType;
  checkingUserError: IApiError | null;

  logoutStatus: LoadingType;
  logoutError: IApiError | null;
}

export interface IActionSuccess {
  type: string;
  payload: any;
}
export interface IActionFailure {
  type: string;
  payload: IApiError;
}
export interface IActionRequest {
  type: string;
  payload: any;
}

export interface ILoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}
export interface ICheckingUserSuccess {
  type: typeof CHECK_USER_SUCCESS;
  payload: any;
}
export interface ILogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
  payload: any;
}

export type UserActionsType =
  | IActionSuccess
  | IActionFailure
  | IActionRequest
  | ILoginSuccess
  | ICheckingUserSuccess
  | ILogoutSuccess;
