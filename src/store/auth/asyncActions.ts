import { createAsyncThunk } from '@reduxjs/toolkit';
import { authModuleName } from 'store/auth/types';
import * as AuthApi from 'api/main/auth';
import { IFirebaseApiError } from 'utils/constants/other';

const asyncHelper = async (asyncCallback: () => any, rejectWithValue: any) => {
  try {
    return await Promise.resolve(asyncCallback());
  } catch (err) {
    return rejectWithValue(err);
  }
};

type ThunkApiConfigType<T = any, U = IFirebaseApiError> = {
  extra: T;
  rejectValue: U;
};

export const signIn = createAsyncThunk<any, AuthApi.IUserLoginCredentials, ThunkApiConfigType>(
  `${authModuleName}/signIn`,
  async (data, { rejectWithValue }) => {
    return asyncHelper(() => AuthApi.doSignInWithEmailAndPassword(data), rejectWithValue);
  },
);

export const signUp = createAsyncThunk<any, AuthApi.IUserRegisterCredentials, ThunkApiConfigType>(
  `${authModuleName}/signUp`,
  async (data, { rejectWithValue }) => {
    return asyncHelper(() => AuthApi.doCreateUserWithEmailAndPassword(data), rejectWithValue);
  },
);

export const resetPassword = createAsyncThunk<any, string, ThunkApiConfigType>(
  `${authModuleName}/resetPassword`,
  async (data, { rejectWithValue }) => {
    return asyncHelper(() => AuthApi.sendPasswordResetEmail(data), rejectWithValue);
  },
);

export const confirmPasswordReset = createAsyncThunk<
  any,
  { code: string; newPassword: string },
  ThunkApiConfigType
>(`${authModuleName}/confirmPasswordReset`, async (data, { rejectWithValue }) => {
  return asyncHelper(
    () => AuthApi.confirmPasswordReset(data.code, data.newPassword),
    rejectWithValue,
  );
});
