// Todo: implement other actions; refactor

// Core
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { ConfirmPasswordReset } from '../ConfirmPasswordReset/ConfirmPasswordReset';
import * as AuthApi from 'api/firebase/auth';
import { ROUTES } from 'utils/constants/routes';
import { useAsyncAction } from 'hooks/useAsyncAction';
import { useSnackbar } from 'notistack';
import { FullSizeProgress } from 'components/ui';
import { getQueryStringValues } from 'utils/queryString';
import { AuthFormLayout } from 'components/layouts/AuthLayout/AuthFormLayout/AuthFormLayout';

const EmailLink: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [C, setComponent] = useState<React.FC<any>>(() => <FullSizeProgress />);

  // Get data from query string
  const qs = getQueryStringValues();
  const { mode } = qs;
  const code = qs.oobCode || '';

  // Verify email
  const verifyEmailCallback = useCallback(
    async codeQ => {
      await AuthApi.applyActionCode(codeQ);
      enqueueSnackbar('Email has been verified successfully. Please, sign in.', {
        variant: 'success',
      });
      history.push(ROUTES.SIGN_IN);
    },
    [history, enqueueSnackbar],
  );
  const { execute: callVerifyEmail } = useAsyncAction(verifyEmailCallback);

  // Reset password
  const resetPasswordCallback = useCallback(async someCode => {
    await AuthApi.handleResetPassword(someCode);
    setComponent(() => <ConfirmPasswordReset code={someCode} />);
  }, []);
  const { execute: resetPassword } = useAsyncAction(resetPasswordCallback);

  useEffect(() => {
    async function callback() {
      switch (mode) {
        case 'resetPassword':
          await resetPassword(code);
          break;
        case 'recoverEmail':
          setComponent(() => <div>recoverEmail</div>);
          break;
        case 'verifyEmail':
          await callVerifyEmail(code);
          break;
        default:
          setComponent(() => <div>Invalid mode</div>);
      }
    }

    callback();
  }, [callVerifyEmail, resetPassword, mode, code]);

  return <AuthFormLayout>{C}</AuthFormLayout>;
};

export default EmailLink;
