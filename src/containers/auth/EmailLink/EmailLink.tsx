import React, { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { verifyEmail } from '../../../store/auth/login/actions';
import { HOME, SIGN_IN } from '../../../utils/constants/routes';

export const EmailLink: React.FC = (props): JSX.Element => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { search } = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(search);

  const callVerifyEmail = useCallback(
    async (code: string) => {
      try {
        await dispatch(verifyEmail(code!));
        history.push(HOME);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        history.push(SIGN_IN);
      }
    },
    [history, dispatch, enqueueSnackbar],
  );

  useEffect(() => {
    const mode = queryParams.get('mode');
    const code = queryParams.get('oobCode');
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        // handleResetPassword(auth, actionCode, continueUrl, lang);
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.
        // handleRecoverEmail(auth, actionCode, lang);
        break;
      case 'verifyEmail':
        callVerifyEmail(code!);
        break;
      default:
      // Error: invalid mode.
    }
  }, [callVerifyEmail, queryParams]);

  return <div>31</div>;
};
