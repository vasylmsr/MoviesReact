// Core
import React from 'react';
import { useLocation } from 'react-router';
// import { useDispatch } from 'react-redux';

// Other
// import { applyActionCode } from 'store/auth/sagas';
// import { HOME, SIGN_IN } from 'utils/constants/routes';
import { ConfirmPasswordReset } from '../ConfirmPasswordReset/ConfirmPasswordReset';
// import { useAsyncAction } from 'components/hooks/useAsyncAction';
import * as AuthApi from 'api/main/auth';
// import { useSnackbar } from 'notistack';

const EmailLink: React.FC = () => {
  // const dispatch = useDispatch();
  const { search } = useLocation();
  // const history = useHistory();
  const queryParams = new URLSearchParams(search);
  // const { enqueueSnackbar } = useSnackbar();

  const mode = queryParams.get('mode');
  const code = queryParams.get('oobCode') || '';

  // const { execute: callVerifyEmail } = useAsyncAction(
  //   async () => {
  //     console.log('before Q');
  //     const q = await dispatch(applyActionCode(code!));
  //     console.log('q', q);
  //     // enqueueSnackbar('Email has been verified successfully', { variant: 'success' });
  //     // history.push(HOME);
  //   },
  //   () => history.push(SIGN_IN),
  // );
  // AuthApi.applyActionCode(code!
  console.log('mode', mode);
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
      AuthApi.applyActionCode(code);
      return <div>Email verification...</div>;
    default:
      return <div>Invalid mode</div>;
  }
};

export default EmailLink;
