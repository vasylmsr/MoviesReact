import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import { getDefaultAuthStyles } from '../styles';
import { UiButton } from '../../../components/ui/UiButton/UiButton';
import { resetPassword } from '../../../store/auth/login/actions';
import { SIGN_IN, SIGN_UP } from '../../../utils/constants/routes';
import { AuthTextField } from '../../../components/auth/AuthTextField/AuthTextField';
import { useAsyncAction } from '../../../components/hooks/useAsyncAction';
import { AuthFormLayout } from '../../../components/Layouts/AuthLayout/AuthFormLayout/AuthFormLayout';

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

const forgotPasswordValidationSchema = yup.object({
  email: yup.string().email().required(),
});

const ForgotPassword: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  const { loading, execute } = useAsyncAction(async (email: string) => {
    await dispatch(resetPassword(email));
    enqueueSnackbar(`Check ${email} email`);
  });

  const onSubmit = handleSubmit(({ email }) => execute(email));

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

export default ForgotPassword;
