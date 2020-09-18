import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { HOME } from '../../../utils/constants/routes';
import { signIn } from '../../../store/auth/login/actions';
import { SignInForm } from '../../../components/auth/SignInForm/SignInForm';

export const SignIn: React.FC = (): JSX.Element => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      history.push(HOME);
    }
  }, [user, history]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await dispatch(signIn(data));
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return <SignInForm onSignIn={onSubmit} loading={loading} />;
};
