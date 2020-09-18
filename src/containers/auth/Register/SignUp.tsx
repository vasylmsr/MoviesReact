import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import * as AuthApi from '../../../api/auth';
import { signUp } from '../../../store/auth/login/actions';
import { SignUpForm } from '../../../components/auth/SignUpForm/SignUpForm';

export const SignUp: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: AuthApi.IUserRegisterCredentials) => {
    try {
      setLoading(true);
      await dispatch(signUp(data));
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <SignUpForm onSignUp={onSubmit} loading={loading} />
    </>
  );
};
