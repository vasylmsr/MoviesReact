import { CHECK_USER_FAILURE, CHECK_USER_REQUEST, CHECK_USER_SUCCESS, LOGOUT } from './types';
import * as AuthApi from '../../../firebase/AuthApi';
import { IApiError } from '../../../utils/constants/other';
import { IUserLoginCredentials } from '../../../firebase/AuthApi';

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

export const logoutAction = () => ({
  type: LOGOUT,
  payload: null,
});

export const signIn = (data: IUserLoginCredentials) => () =>
  AuthApi.doSignInWithEmailAndPassword(data);

export const signUp = (data: AuthApi.IUserRegisterCredentials) => () =>
  AuthApi.doCreateUserWithEmailAndPassword(data);

export const applyActionCode = (code: string) => () => AuthApi.applyActionCode(code!);

export const logout = () => async (dispatch: any) => {
  await AuthApi.doLogout();
  dispatch(logoutAction());
};

export const resetPassword = (email: string) => () => AuthApi.sendPasswordResetEmail(email);

export const confirmPasswordReset = (code: string, newPassword: string) => () =>
  AuthApi.confirmPasswordReset(code, newPassword);

export const storeAuthUser = (authUser: any) => async (dispatch: any) => {
  try {
    dispatch(checkUserRequest());
    const userProfile = await AuthApi.getUserProfile(authUser.uid);
    dispatch(checkUserSuccess(userProfile));
  } catch (error) {
    checkUserFailure(error);
  }
};
