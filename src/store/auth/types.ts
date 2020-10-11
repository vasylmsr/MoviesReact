import { StatusType } from '../helpers';

export interface IUserProfile {
  uid: string;
  firstName: string;
  lastName: string;
}

export interface IAuthReducer {
  user: IUserProfile | null;
  checkingUser: StatusType;
  signIn: StatusType;
  signUp: StatusType;
}
