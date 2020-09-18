import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import * as AuthApi from './api/auth';
import { storeAuthUser } from './store/auth/login/actions';
import { AppRoutes } from './components/AppRoutes';
import { SUCCESS_STATUS } from './utils/constants/other';

export default function App() {
  const dispatch = useDispatch();
  const [hasUserInStorage, setAvailabilityUserInStorage] = useState(true);
  const { checkingUserStatus } = useSelector((state: any) => state.auth);
  // We don`t save data in LS because api save token inside IndexedDB
  React.useEffect(
    () =>
      AuthApi.onAuthStateChanged((user: any) => {
        if (user) {
          dispatch(storeAuthUser(user));
        } else {
          setAvailabilityUserInStorage(false);
        }
      }),
    [dispatch],
  );

  const isRoutesVisible = !hasUserInStorage || checkingUserStatus === SUCCESS_STATUS;
  return <SnackbarProvider maxSnack={3}>{isRoutesVisible && <AppRoutes />}</SnackbarProvider>;
}
