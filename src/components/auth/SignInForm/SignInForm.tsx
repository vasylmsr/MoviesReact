import React from 'react';
import { Avatar, Grid, Typography, makeStyles, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { UiButton } from 'components/ui';
import { FORGOT_PASSWORD, SIGN_UP } from '../../../utils/constants/routes';
import * as AuthApi from '../../../api/auth';
import SignInValidation from '../../../containers/auth/SignIn/SignInValidation';
import { getDefaultAuthStyles } from '../../../containers/auth/styles';
import { AuthTextField } from '../AuthTextField/AuthTextField';
import { AuthFormLayout } from '../../Layouts/AuthLayout/AuthFormLayout/AuthFormLayout';

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

type SignInProps = {
  onSignIn: (data: any) => void;
  loading: boolean;
};

export const SignInForm: React.FC<SignInProps> = props => {
  const { onSignIn, loading } = props;
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<AuthApi.IUserLoginCredentials>({
    resolver: yupResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async data => {
    onSignIn(data);
  });

  return (
    <AuthFormLayout>
      <>
        <CssBaseline />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <AuthTextField
            label="Email Address"
            name="email"
            autoFocus
            inputRef={register}
            customError={errors.email}
          />
          <AuthTextField
            name="password"
            label="Password"
            type="password"
            inputRef={register}
            customError={errors.password}
          />

          <UiButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
          >
            Sign In
          </UiButton>
          <Grid container>
            <Grid item xs>
              <RouterLink to={FORGOT_PASSWORD}>Forgot password?</RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to={SIGN_UP}>Don`t have an account? Sign Up</RouterLink>
            </Grid>
          </Grid>
        </form>
      </>
    </AuthFormLayout>
  );
};
