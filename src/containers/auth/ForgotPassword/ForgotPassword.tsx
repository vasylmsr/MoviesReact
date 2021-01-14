import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { RootStateType } from 'store';

import { MetaTitle } from 'components/MetaTitle';
import { ForgotPasswordForm } from 'components/auth/ForgotPasswordForm/ForgotPasswordForm';
import { clearResetPasswordState } from 'store/auth/slice';
import { LOADING_STATUS, SUCCESS_STATUS } from 'utils/constants/other';
import useErrorNotificator from 'hooks/useErrorNotificator';
import { resetPassword } from 'store/auth/asyncActions';

const ForgotPassword: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { status, error } = useSelector((state: RootStateType) => state.auth.resetPassword);

  const onSubmit = ({ email }: { email: string }) => {
    dispatch(resetPassword(email));
  };

  useErrorNotificator(error);

  useEffect(() => {
    if (status === SUCCESS_STATUS) {
      enqueueSnackbar(`Check your email`);
    }
  }, [status, enqueueSnackbar]);

  useEffect(() => {
    return () => {
      dispatch(clearResetPasswordState());
    };
  }, [dispatch]);

  return (
    <>
      <MetaTitle title="Forgot Password" />
      <ForgotPasswordForm onForgotPassword={onSubmit} loading={status === LOADING_STATUS} />
    </>
  );
};

export default ForgotPassword;
