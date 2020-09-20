import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/auth/login/actions';
import { SignUpForm } from '../../../components/auth/SignUpForm/SignUpForm';
import { useAsyncAction } from '../../../components/hooks/useAsyncAction';

export const SignUp: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { loading, execute } = useAsyncAction((data: any) => dispatch(signUp(data)));

  return <SignUpForm onSignUp={execute} loading={loading} />;
};
