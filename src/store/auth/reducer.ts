// Todo: split file
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthReducer, IUserProfile } from './types';
import { IApiError } from '../../utils/constants/other';
import {
  clearState,
  getStatusObj,
  setFetchingError,
  setFetchingRequest,
  setFetchingSuccess,
} from '../helpers';
import { IUserLoginCredentials, IUserRegisterCredentials } from '../../api/auth';

const initialState: IAuthReducer = {
  user: null,
  isAuthResolved: false,
  isUserConfirmed: false,
  checkingUser: getStatusObj(),
  signIn: getStatusObj(),
  signUp: getStatusObj(),
  resetPassword: getStatusObj(),
  confirmPasswordReset: getStatusObj(),
};

const moduleName = 'auth';

type UserActionPayloadType = PayloadAction<IUserProfile | null>;
function setUserReducer(state: any, action: UserActionPayloadType) {
  state.user = action.payload;
  state.isAuthResolved = true;
  state.isUserConfirmed = action.payload?.emailVerified;
}

// function createOwnSlice({ name, prevState }: any): Slice {
//   return createSlice({
//     name,
//     initialState: prevState,
//     reducers: {
//       [`${name}Request`](state) {
//         setFetchingRequest(state[name]);
//       },
//       [`${name}Success`](state) {
//         setFetchingSuccess(state[name]);
//       },
//       [`${name}Failure`](state, action: PayloadAction<IApiError>) {
//         setFetchingError(state[name], action.payload);
//       },
//     },
//   });
// }
//
// const q = createOwnSlice({
//   name: 'checkUsera',
// });
//
// const { checkUse, checkUseraSuccess } = q.actions;

const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    setUser: setUserReducer,

    checkUserRequest(state) {
      setFetchingRequest(state.checkingUser);
    },
    checkUserSuccess(state, action: UserActionPayloadType) {
      // We don`t save tokens in LS because api(firebase) saves it inside IndexedDB
      setUserReducer(state, action);
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
    clearSignInState(state) {
      clearState(state.signIn);
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
    clearSignUpState(state) {
      clearState(state.signUp);
    },

    resetPasswordRequest(state) {
      setFetchingRequest(state.resetPassword);
    },
    resetPasswordSuccess(state) {
      setFetchingSuccess(state.resetPassword);
    },
    resetPasswordFailure(state, action: PayloadAction<IApiError>) {
      setFetchingError(state.resetPassword, action.payload);
    },
    clearResetPasswordState(state) {
      clearState(state.resetPassword);
    },

    confirmPasswordResetRequest(state) {
      setFetchingRequest(state.confirmPasswordReset);
    },
    confirmPasswordResetSuccess(state) {
      setFetchingSuccess(state.confirmPasswordReset);
    },
    confirmPasswordResetFailure(state, action: PayloadAction<IApiError>) {
      setFetchingError(state.confirmPasswordReset, action.payload);
    },
    clearConfirmResetPasswordState(state) {
      clearState(state.resetPassword);
    },

    logoutSuccess(state) {
      state.user = null;
    },
  },
});

export const getFullAuthData = createAction<any>(`${moduleName}/getFullAuthData`);
export const signInAction = createAction<IUserLoginCredentials>(`${moduleName}/signIn`);
export const signUpAction = createAction<IUserRegisterCredentials>(`${moduleName}/signUp`);
export const resetPasswordAction = createAction<string>(`${moduleName}/resetPassword`);
export const confirmResetPasswordAction = createAction(`${moduleName}/confirmResetPassword`);
export const logoutAction = createAction(`${moduleName}/logout`);

export const {
  setUser,

  checkUserRequest,
  checkUserSuccess,
  checkUserFailure,

  signInRequest,
  signInFailure,
  signInSuccess,
  clearSignInState,

  signUpRequest,
  signUpFailure,
  signUpSuccess,
  clearSignUpState,

  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearResetPasswordState,

  confirmPasswordResetRequest,
  confirmPasswordResetSuccess,
  confirmPasswordResetFailure,
  clearConfirmResetPasswordState,

  logoutSuccess,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
