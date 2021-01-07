// Core
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { forgotPasswordValidationSchema } from './forgotPasswordValidationSchema';

// UI
import { AuthFormLayout } from '../../layouts/AuthLayout/AuthFormLayout/AuthFormLayout';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { AuthTextField } from '../AuthTextField/AuthTextField';
import { UiButton } from 'components/ui';

// Other
import { SIGN_IN, SIGN_UP } from 'utils/constants/routes';
import { getDefaultAuthStyles } from 'containers/auth/styles';

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

type ForgotPasswordFormProps = {
  onForgotPassword: (data: { email: string }) => void;
  loading: boolean;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = props => {
  const { onForgotPassword, loading } = props;
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    onForgotPassword(data);
  });

  return (
    <AuthFormLayout>
      <Typography component="h1" variant="h5">
        Forgot password
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <AuthTextField
          label="Email Address"
          name="email"
          autoFocus
          inputRef={register}
          customError={errors.email}
        />

        <Grid container>
          <Grid item xs>
            <RouterLink to={SIGN_IN}>Sign In</RouterLink>
          </Grid>
          <Grid item>
            <RouterLink to={SIGN_UP}>Don`t have an account? Sign Up</RouterLink>
          </Grid>
        </Grid>

        <UiButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          loading={loading}
        >
          Send verification email
        </UiButton>
      </form>
    </AuthFormLayout>
  );
};
