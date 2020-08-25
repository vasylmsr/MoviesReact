import {
  CHECK_USER_FAILURE,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  ILoginSuccess,
  IUserProfile,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from './types';
import * as AuthApi from '../../../firebase/AuthApi';
import { IApiError } from '../../../utils/constants/other';

export const loginSuccess = (userProfile: IUserProfile): ILoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload: userProfile,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
  payload: null,
});

export const loginFailure = (error: IApiError) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const checkUserFailure = (error: IApiError) => ({
  type: CHECK_USER_FAILURE,
  payload: error,
});
export const checkUserRequest = () => ({
  type: CHECK_USER_REQUEST,
  payload: null,
});
export const checkUserSuccess = (userProfile: any) => ({
  type: CHECK_USER_SUCCESS,
  payload: userProfile,
});

export const logoutFailure = (error: IApiError) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});
export const logoutRequest = () => ({
  type: LOGOUT_SUCCESS,
  payload: null,
});
export const logoutSuccess = (data: any) => ({
  type: CHECK_USER_SUCCESS,
  payload: data,
});

export const signIn = (data: AuthApi.IUserLoginCredentials) => async (dispatch: any) => {
  dispatch(loginRequest());
  try {
    const userProfile: IUserProfile = await AuthApi.doSignInWithEmailAndPassword(data);
    console.log(userProfile)
    dispatch(loginSuccess(userProfile));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const signUp = (data: AuthApi.IUserRegisterCredentials) => async (dispatch: any) => {
  dispatch(loginRequest());
  try {
    const response = await AuthApi.doCreateUserWithEmailAndPassword(data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const storeAuthUser = (authUser: any) => async (dispatch: any) => {
  try {
    dispatch(checkUserRequest());
    const userProfile = await AuthApi.getUserProfile(authUser.uid);
    dispatch(checkUserSuccess(userProfile));
  } catch (error) {
    checkUserFailure(error);
  }
};

export const logout = () => async (dispatch: any) => {
  dispatch(logoutRequest());
  try {
    const response = await AuthApi.doLogout();
    dispatch(logoutSuccess(response));
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};
