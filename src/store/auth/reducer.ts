import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthReducer, IUserProfile } from './types';
import { IApiError } from '../../utils/constants/other';
import { getStatusObj, setFetchingError, setFetchingRequest, setFetchingSuccess } from '../helpers';
import { IUserLoginCredentials, IUserRegisterCredentials } from '../../api/auth';

const initialState: IAuthReducer = {
  user: null,
  checkingUser: getStatusObj(),
  signIn: getStatusObj(),
  signUp: getStatusObj(),
};

const moduleName = 'auth';
const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    checkUserRequest(state) {
      setFetchingRequest(state.checkingUser);
    },
    checkUserSuccess(state, action: PayloadAction<IUserProfile>) {
      state.user = action.payload;
      setFetchingSuccess(state.checkingUser);
    },
    checkUserFailure(state, action: PayloadAction<any>) {
      setFetchingError(state.checkingUser, action.payload);
    },

    signInRequest(state) {
      setFetchingRequest(state.signIn);
    },
    signInSuccess(state) {
      setFetchingSuccess(state.signIn);
    },
    signInFailure(state, action: PayloadAction<IApiError>) {
      setFetchingError(state.signIn, action.payload);
    },

    signUpRequest(state) {
      setFetchingRequest(state.signUp);
    },
    signUpSuccess(state) {
      setFetchingSuccess(state.signUp);
    },
    signUpFailure(state, action: PayloadAction<IApiError>) {
      setFetchingError(state.signUp, action.payload);
    },

    logout(state) {
      state.user = null;
    },
  },
});

export const checkUser = createAction<any>(`${moduleName}/checkUser`);
export const signInAction = createAction<IUserLoginCredentials>(`${moduleName}/signIn`);
export const signUpAction = createAction<IUserRegisterCredentials>(`${moduleName}/signUp`);
export const {
  checkUserRequest,
  checkUserSuccess,
  checkUserFailure,

  signInRequest,
  signInFailure,
  signInSuccess,

  signUpRequest,
  signUpFailure,
  signUpSuccess,

  logout,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
