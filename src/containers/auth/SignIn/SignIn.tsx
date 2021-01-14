// Core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from 'store';

import { clearSignInState } from 'store/auth/slice';
import { signIn } from 'store/auth/asyncActions';

import { MetaTitle } from 'components/MetaTitle';
import { SignInForm } from 'components/auth/SignInForm/SignInForm';
import { LOADING_STATUS } from 'utils/constants/other';
import useErrorNotificator from 'hooks/useErrorNotificator';
import { IUserLoginCredentials } from 'api/main/auth';

const SignIn: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { status: signInStatus, error } = useSelector((state: RootStateType) => state.auth.signIn);

  useErrorNotificator(error);

  useEffect(() => {
    return () => {
      dispatch(clearSignInState());
    };
  }, [dispatch]);

  return (
    <>
      <MetaTitle title="Sign In" />
      <SignInForm
        onSignIn={(data: IUserLoginCredentials) => dispatch(signIn(data))}
        loading={signInStatus === LOADING_STATUS}
      />
    </>
  );
};

export default SignIn;
