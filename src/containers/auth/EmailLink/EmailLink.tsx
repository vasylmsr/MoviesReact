import React, { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { applyActionCode } from '../../../store/auth/login/actions';
import { HOME, SIGN_IN } from '../../../utils/constants/routes';
import { handleAsyncAction } from '../../../utils/helpers';
import { ConfirmPasswordReset } from '../ConfirmPasswordReset/ConfirmPasswordReset';

export const EmailLink: React.FC = (props): JSX.Element => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { search } = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(search);

  const callVerifyEmail = useCallback(
    (code: string) => {
      handleAsyncAction({
        async callback() {
          await dispatch(applyActionCode(code!));
          history.push(HOME);
        },
        errorCallback() {
          history.push(SIGN_IN);
        },
        enqueueSnackbar,
      });
    },
    [history, dispatch, enqueueSnackbar],
  );

  const mode = queryParams.get('mode');
  const code = queryParams.get('oobCode') || '';
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      // handleResetPassword(auth, actionCode, continueUrl, lang);

      return <ConfirmPasswordReset code={code} />;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      // handleRecoverEmail(auth, actionCode, lang);
      return <div>recoverEmail</div>;
    case 'verifyEmail':
      callVerifyEmail(code!);
      return <div>verifyEmail</div>;
    default:
      return <div>Invalid mode</div>;
  }
};
