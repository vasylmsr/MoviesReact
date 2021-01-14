// Core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from 'store';

// Other
import { SignUpForm } from 'components/auth/SignUpForm/SignUpForm';
import { MetaTitle } from 'components/MetaTitle';
import { clearSignUpState } from 'store/auth/slice';
import useErrorNotificator from 'hooks/useErrorNotificator';
import { LOADING_STATUS } from 'utils/constants/other';
import { signUp } from 'store/auth/asyncActions';
import * as AuthApi from 'api/main/auth';

const SignUp: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootStateType) => state.auth.signUp);
  useErrorNotificator(error);

  useEffect(() => {
    return () => {
      dispatch(clearSignUpState());
    };
  }, [dispatch]);

  return (
    <>
      <MetaTitle title="Sign Up" />
      <SignUpForm
        onSignUp={(data: AuthApi.IUserRegisterCredentials) => dispatch(signUp(data))}
        loading={status === LOADING_STATUS}
      />
    </>
  );
};

export default SignUp;
