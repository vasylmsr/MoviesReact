import { createSlice } from '@reduxjs/toolkit';
import { IAuthState, UserActionPayloadType } from './types';
import {
  clearState,
  getStatusObj,
  setFetchingError,
  setFetchingRequest,
  setFetchingSuccess,
} from '../helpers';
import { confirmPasswordReset, resetPassword, signIn, signUp } from 'store/auth/asyncThunks';

const initialState: IAuthState = {
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

const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    setUser(state: any, action: UserActionPayloadType) {
      if (action.payload) {
        const { uid, displayName, email, emailVerified, photoURL } = action.payload;
        state.user = { uid, displayName, email, emailVerified, photoURL };
        state.isUserConfirmed = emailVerified;
      } else {
        state.user = action.payload;
        state.isUserConfirmed = false;
      }
      state.isAuthResolved = true;
    },
    clearSignInState(state) {
      clearState(state.signIn);
    },
    clearSignUpState(state) {
      clearState(state.signUp);
    },
    clearResetPasswordState(state) {
      clearState(state.resetPassword);
    },
    clearConfirmResetPasswordState(state) {
      clearState(state.resetPassword);
    },
    logoutSuccess(state) {
      state.user = null;
    },
  },
  extraReducers: builder => {
    const asyncActions = [
      ['signIn', signIn],
      ['signUp', signUp],
      ['resetPassword', resetPassword],
      ['confirmPasswordReset', confirmPasswordReset],
    ] as const;

    asyncActions.forEach(([stateVariable, asyncThunk]) => {
      builder
        .addCase(asyncThunk.pending, state => {
          setFetchingRequest(state[stateVariable]);
        })
        .addCase(asyncThunk.fulfilled, state => {
          setFetchingSuccess(state[stateVariable]);
        })
        .addCase(asyncThunk.rejected, (state, { payload }) => {
          setFetchingError(state[stateVariable], payload);
        });
    });
  },
});

export const {
  setUser,
  clearSignInState,
  clearSignUpState,
  clearResetPasswordState,
  clearConfirmResetPasswordState,
  logoutSuccess,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
