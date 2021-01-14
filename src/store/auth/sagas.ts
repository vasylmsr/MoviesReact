import * as AuthApi from '../../api/main/auth';
import { logoutSuccess } from './slice';

export const applyActionCode = (code: string) => () => AuthApi.applyActionCode(code!);

export const logout = () => async (dispatch: any) => {
  await AuthApi.doLogout();
  dispatch(logoutSuccess());
};

export const resetPassword = (email: string) => () => AuthApi.sendPasswordResetEmail(email);

export const confirmPasswordReset = (code: string, newPassword: string) => () =>
  AuthApi.confirmPasswordReset(code, newPassword);
