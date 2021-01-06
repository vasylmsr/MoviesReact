import { put, call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as AuthApi from '../../api/auth';
import {
  getFullAuthData,
  checkUserFailure,
  checkUserRequest,
  checkUserSuccess,
  logoutSuccess,
  signInAction,
  signInRequest,
  signInFailure,
  signInSuccess,
  signUpAction,
  signUpRequest,
  signUpFailure,
  signUpSuccess,
  resetPasswordAction,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  confirmResetPasswordAction,
  confirmPasswordResetRequest,
  confirmPasswordResetSuccess,
  confirmPasswordResetFailure,
  logoutAction,
} from './reducer';

function* onCheckUser({ payload }: PayloadAction<any>) {
  try {
    const { uid, displayName, email, emailVerified } = payload;
    yield put(checkUserRequest());
    // const userProfile = yield call(AuthApi.getUserProfile, payload.uid);
    yield put(checkUserSuccess({ uid, displayName, email, emailVerified }));
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
    console.log('sign up');
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* onResetPassword({ payload }: PayloadAction<string>) {
  try {
    yield put(resetPasswordRequest());
    yield call(AuthApi.sendPasswordResetEmail, payload);
    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(resetPasswordFailure(error));
  }
}

function* onConfirmResetPassword({ payload }: PayloadAction<any>) {
  try {
    yield put(confirmPasswordResetRequest());
    yield call(AuthApi.confirmPasswordReset, payload.code, payload.newPasword);
    yield put(confirmPasswordResetSuccess());
  } catch (error) {
    yield put(confirmPasswordResetFailure(error));
  }
}

function* onLogout() {
  yield call(AuthApi.doLogout);
  yield put(logoutSuccess);
}

export function* watchAuthSagas() {
  yield takeEvery(getFullAuthData, onCheckUser);
  yield takeEvery(signInAction, onSignIn);
  yield takeEvery(signUpAction, onSignUp);
  yield takeEvery(logoutAction, onLogout);
  yield takeEvery(resetPasswordAction, onResetPassword);
  yield takeEvery(confirmResetPasswordAction, onConfirmResetPassword);
}

export const applyActionCode = (code: string) => () => AuthApi.applyActionCode(code!);

export const logout = () => async (dispatch: any) => {
  await AuthApi.doLogout();
  dispatch(logoutSuccess());
};

export const resetPassword = (email: string) => () => AuthApi.sendPasswordResetEmail(email);

export const confirmPasswordReset = (code: string, newPassword: string) => () =>
  AuthApi.confirmPasswordReset(code, newPassword);
