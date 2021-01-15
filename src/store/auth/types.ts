import { StatusType } from '../helpers';
import { PayloadAction } from '@reduxjs/toolkit';

export const authModuleName = 'auth';

export interface IUserProfile {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
}

export interface IAuthState {
  user: IUserProfile | null;
  isAuthResolved: boolean;
  isUserConfirmed: boolean;
  checkingUser: StatusType;
  signIn: StatusType;
  signUp: StatusType;
  resetPassword: StatusType;
  confirmPasswordReset: StatusType;
}

export type UserActionPayloadType = PayloadAction<firebase.User | null>;
