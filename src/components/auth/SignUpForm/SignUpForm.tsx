import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { UiButton } from 'components/ui';
import { FORGOT_PASSWORD, SIGN_IN } from 'utils/constants/routes';
import * as AuthApi from 'api/auth';
import { getDefaultAuthStyles } from 'containers/auth/styles';
import { AuthTextField } from '../AuthTextField/AuthTextField';
import { signUpValidationSchema } from './SignUpValidation';
import { AuthFormLayout } from '../../Layouts/AuthLayout/AuthFormLayout/AuthFormLayout';

type SignUpFormProps = {
  onSignUp: (data: AuthApi.IUserRegisterCredentials) => void;
  loading: boolean;
};

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

export const SignUpForm: React.FC<SignUpFormProps> = (props: SignUpFormProps): JSX.Element => {
  const { onSignUp, loading } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm<AuthApi.IUserRegisterCredentials>({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = handleSubmit((data: AuthApi.IUserRegisterCredentials) => {
    onSignUp(data);
  });

  return (
    <AuthFormLayout>
      <Typography component="h1" variant="h5">
        Sign Up
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

        <AuthTextField
          name="firstName"
          label="First Name"
          inputRef={register}
          customError={errors.firstName}
        />

        <AuthTextField
          name="lastName"
          label="Last Name"
          inputRef={register}
          customError={errors.lastName}
        />

        <UiButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          loading={loading}
        >
          Sign Up
        </UiButton>
        <Grid container>
          <Grid item xs>
            <RouterLink to={FORGOT_PASSWORD}>Forgot password?</RouterLink>
          </Grid>
          <Grid item>
            <RouterLink to={SIGN_IN}>Sign In</RouterLink>
          </Grid>
        </Grid>
      </form>
    </AuthFormLayout>
  );
};
