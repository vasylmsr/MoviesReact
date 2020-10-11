import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MetaTitle } from 'components/MetaTitle';
import { RootStateType } from 'store';
import { HOME } from '../../../utils/constants/routes';
import { SignInForm } from '../../../components/auth/SignInForm/SignInForm';
import { signInAction } from '../../../store/auth/reducer';
import { LOADING_STATUS } from '../../../utils/constants/other';

const SignIn: React.FC = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => state.auth);
  const { status: signInStatus } = useSelector((state: RootStateType) => state.auth.signIn);

  useEffect(() => {
    if (user) {
      history.push(HOME);
    }
  }, [user, history]);

  return (
    <>
      <MetaTitle title="Sign In" />
      <SignInForm
        onSignIn={(data: any) => dispatch(signInAction(data))}
        loading={signInStatus === LOADING_STATUS}
      />
    </>
  );
};

export default SignIn;
