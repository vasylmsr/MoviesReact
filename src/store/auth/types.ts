import { StatusType } from '../helpers';

export interface IUserProfile {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
}

export interface IAuthReducer {
  user: IUserProfile | null;
  isAuthResolved: boolean;
  isUserConfirmed: boolean;
  checkingUser: StatusType;
  signIn: StatusType;
  signUp: StatusType;
  resetPassword: StatusType;
  confirmPasswordReset: StatusType;
}
