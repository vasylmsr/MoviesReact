import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch } from 'react-redux';
import { getDefaultAuthStyles } from '../styles';
import { SIGN_UP } from '../../../utils/constants/routes';
import GoogleIcon from '../../../assets/images/google.png';
import * as AuthApi from '../../../firebase/AuthApi';
import { signUpValidationSchema } from './SignUpValidation';
import { signUp } from '../../../store/auth/login/actions';

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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoFocus
          inputRef={register}
          helperText={errors.email?.message}
          error={Boolean(errors.email)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          inputRef={register}
          helperText={errors.password?.message}
          error={Boolean(errors.password)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="firstName"
          label="firstName"
          inputRef={register}
          helperText={errors.firstName?.message}
          error={Boolean(errors.firstName)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="lastName"
          inputRef={register}
          helperText={errors.lastName?.message}
          error={Boolean(errors.lastName)}
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button onClick={AuthApi.doSignInWithGoogle}>
          <img src={GoogleIcon} width="auto" height="30px" />
        </Button>
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
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <RouterLink to={SIGN_UP}>Don`t have an account? Sign Up</RouterLink>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
