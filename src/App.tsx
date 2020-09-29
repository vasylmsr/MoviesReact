import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import * as AuthApi from './api/auth';
import { storeAuthUser } from './store/auth/login/actions';
import { AppRoutes } from './components/routing/AppRoutes';
import { SUCCESS_STATUS } from './utils/constants/other';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const [hasUserInStorage, setAvailabilityUserInStorage] = useState(true);
  const { checkingUserStatus } = useSelector((state: any) => state.auth);
  // We don`t save data in LS because api(firebase) saves token inside IndexedDB
  React.useEffect(
    () =>
      AuthApi.onAuthStateChanged((user: any) => {
        user ? dispatch(storeAuthUser(user)) : setAvailabilityUserInStorage(false);
      }),
    [dispatch],
  );

  const isRoutesVisible = !hasUserInStorage || checkingUserStatus === SUCCESS_STATUS;
  return <SnackbarProvider maxSnack={3}>{isRoutesVisible && <AppRoutes />}</SnackbarProvider>;
}
