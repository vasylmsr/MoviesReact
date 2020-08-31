import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { FORGOT_PASSWORD, HOME, SIGN_UP } from '../../../utils/constants/routes';
import * as AuthApi from '../../../firebase/AuthApi';
import signInValidationSchema from './SignInValidation';
import { getDefaultAuthStyles } from '../styles';
import { UiButton } from '../../../components/ui/UiButton/UiButton';
import { signIn } from '../../../store/auth/login/actions';
import { AuthTextField } from '../../../components/auth/AuthTextField/AuthTextField';

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

export const SignIn: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm<AuthApi.IUserLoginCredentials>({
    resolver: yupResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      history.push(HOME);
    }
  }, [user, history]);

  const onSubmit = handleSubmit(async data => {
    try {
      setLoading(true);
      await dispatch(signIn(data));
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  });

  return (
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
  );
};
