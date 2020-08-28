import { CHECK_USER_FAILURE, CHECK_USER_REQUEST, CHECK_USER_SUCCESS } from './types';
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

export const signIn = (data: IUserLoginCredentials) => () =>
  AuthApi.doSignInWithEmailAndPassword(data);

export const signUp = (data: AuthApi.IUserRegisterCredentials) => () =>
  AuthApi.doCreateUserWithEmailAndPassword(data);

export const verifyEmail = (code: string) => () => AuthApi.confirmEmail(code!);

export const logout = () => () => AuthApi.doLogout();

export const storeAuthUser = (authUser: any) => async (dispatch: any) => {
  try {
    dispatch(checkUserRequest());
    const userProfile = await AuthApi.getUserProfile(authUser.uid);
    dispatch(checkUserSuccess(userProfile));
  } catch (error) {
    checkUserFailure(error);
  }
};
