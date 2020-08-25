import * as AuthApi from '../../../firebase/AuthApi';
import { loginRequest, loginSuccess } from '../login/actions';

export const signUp = (data: AuthApi.IUserRegisterCredentials) => async (dispatch: any) => {
  dispatch(loginRequest());
  try {
    const userProfile = await AuthApi.doCreateUserWithEmailAndPassword(data);
    console.log(userProfile)
  } catch (error) {
    console.log(error);
  }
};
