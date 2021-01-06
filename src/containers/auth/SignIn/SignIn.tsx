// Core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from 'store';

import { clearSignInState, signInAction } from 'store/auth/reducer';
import { MetaTitle } from 'components/MetaTitle';
import { SignInForm } from 'components/auth/SignInForm/SignInForm';
import { LOADING_STATUS } from 'utils/constants/other';
import useErrorNotificator from 'components/hooks/useErrorNotificator';
import { IUserLoginCredentials } from 'api/auth';

const SignIn: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { status: signInStatus, error } = useSelector((state: RootStateType) => state.auth.signIn);
  const { status: checkingUserStatus } = useSelector(
    (state: RootStateType) => state.auth.checkingUser,
  );

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
        onSignIn={(data: IUserLoginCredentials) => dispatch(signInAction(data))}
        loading={signInStatus === LOADING_STATUS || checkingUserStatus === LOADING_STATUS}
      />
    </>
  );
};

export default SignIn;
