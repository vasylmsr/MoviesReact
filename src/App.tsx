import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import * as AuthApi from './api/auth';
import { AppRoutes } from './components/routing/AppRoutes';
import { SUCCESS_STATUS } from './utils/constants/other';
import './App.css';
import { checkUser } from './store/auth/reducer';
import { RootStateType } from './store';

export default function App() {
  const dispatch = useDispatch();
  const [hasUserInStorage, setAvailabilityUserInStorage] = useState(true);
  const { status: checkingUserStatus } = useSelector(
    (state: RootStateType) => state.auth.checkingUser,
  );
  // We don`t save data in LS because api(firebase) saves token inside IndexedDB
  React.useEffect(
    () =>
      AuthApi.onAuthStateChanged((user: any) => {
        if (user) {
          dispatch(checkUser(user));
        } else {
          setAvailabilityUserInStorage(false);
        }
      }),
    [dispatch],
  );

  const isRoutesVisible = !hasUserInStorage || checkingUserStatus === SUCCESS_STATUS;
  return <SnackbarProvider maxSnack={3}>{isRoutesVisible && <AppRoutes />}</SnackbarProvider>;
}
