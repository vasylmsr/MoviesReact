import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HOME } from '../../../utils/constants/routes';
import { signIn } from '../../../store/auth/login/actions';
import { SignInForm } from '../../../components/auth/SignInForm/SignInForm';
import { useAsyncAction } from '../../../components/hooks/useAsyncAction';

export const SignIn: React.FC = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      history.push(HOME);
    }
  }, [user, history]);

  const { loading, execute } = useAsyncAction((data: any) => dispatch(signIn(data)));

  return <SignInForm onSignIn={execute} loading={loading} />;
};
