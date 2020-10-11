import { put, call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as AuthApi from '../../api/auth';
import {
  checkUser,
  checkUserFailure,
  checkUserRequest,
  checkUserSuccess,
  logout as logoutAction,
  signInAction,
  signInRequest,
  signInFailure,
  signInSuccess,
  signUpAction,
  signUpRequest,
  signUpFailure,
  signUpSuccess,
} from './reducer';

function* onCheckUser({ payload }: PayloadAction<any>) {
  try {
    yield put(checkUserRequest());
    const userProfile = yield call(AuthApi.getUserProfile, payload.uid);
    yield put(checkUserSuccess(userProfile));
  } catch (error) {
    yield put(checkUserFailure(error));
  }
}

function* onSignIn({ payload }: PayloadAction<AuthApi.IUserLoginCredentials>) {
  try {
    yield put(signInRequest());
    yield call(AuthApi.doSignInWithEmailAndPassword, payload);
    yield put(signInSuccess());
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onSignUp({ payload }: PayloadAction<AuthApi.IUserRegisterCredentials>) {
  try {
    yield put(signUpRequest());
    yield call(AuthApi.doCreateUserWithEmailAndPassword, payload);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* watchAuthSagas() {
  yield takeEvery(checkUser, onCheckUser);
  yield takeEvery(signInAction, onSignIn);
  yield takeEvery(signUpAction, onSignUp);
}

export const signIn = (data: AuthApi.IUserLoginCredentials) => () =>
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
