import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch } from 'react-redux';
import { getDefaultAuthStyles } from '../styles';
import { FORGOT_PASSWORD, SIGN_UP } from '../../../utils/constants/routes';
import * as AuthApi from '../../../firebase/AuthApi';
import { signUpValidationSchema } from './SignUpValidation';
import { signUp } from '../../../store/auth/login/actions';
import { AuthTextField } from '../../../components/auth/AuthTextField/AuthTextField';

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

export const SignUp: React.FC = (): JSX.Element => {
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

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data: AuthApi.IUserRegisterCredentials) => {
    dispatch(signUp(data));
  });

  return (
    <>
      <Typography component="h1">Sign Up</Typography>
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
          label="lastName"
          inputRef={register}
          customError={errors.lastName}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
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
  );
};
