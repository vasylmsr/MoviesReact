// Core
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import SignInValidation from './SignInValidation';

// UI
import { Grid, Typography, makeStyles, Button, Theme } from '@material-ui/core';
import { UiButton } from 'components/ui';
import { getDefaultAuthStyles } from 'containers/auth/styles';
import { AuthTextField } from '../AuthTextField/AuthTextField';
import { AuthFormLayout } from '../../layouts/AuthLayout/AuthFormLayout/AuthFormLayout';
import googleLogo from 'assets/images/google.png';

// Other
import { ROUTES } from 'utils/constants/routes';
import * as AuthApi from 'api/firebase/auth';
import { doSignInWithGoogle, IUserLoginCredentials } from 'api/firebase/auth';

const useStyles = makeStyles((theme: Theme) => ({
  ...getDefaultAuthStyles(theme),
  googleBtn: {
    background: '#ffffff',
    margin: `${theme.spacing(1)}px 0`,
  },
}));

type SignInProps = {
  onSignIn: (data: IUserLoginCredentials) => void;
  loading: boolean;
};

const { FORGOT_PASSWORD, SIGN_UP } = ROUTES;

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

  const onSubmit = handleSubmit(data => {
    onSignIn(data);
  });

  return (
    <AuthFormLayout>
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

        <Button
          variant="contained"
          fullWidth
          className={classes.googleBtn}
          onClick={doSignInWithGoogle}
        >
          <img style={{ maxWidth: 30 }} src={googleLogo} alt="Google" />
        </Button>
      </form>
    </AuthFormLayout>
  );
};
