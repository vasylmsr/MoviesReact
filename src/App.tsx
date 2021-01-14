// Core
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from 'store';
import firebase from 'firebase';

// Components
import { FullSizeProgress } from 'components/ui';
import { AppRoutes } from 'components/routing/AppRoutes';

// Other
import { SnackbarProvider } from 'notistack';
import * as AuthApi from './api/main/auth';
import { setUser } from 'store/auth/slice';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthResolved } = useSelector((state: RootStateType) => state.auth);

  React.useEffect(() => {
    // This method always works after first render
    const unsubscribeAuth = AuthApi.onAuthStateChanged((user: firebase.User | null) => {
      dispatch(setUser(user));
    });
    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  return (
    <SnackbarProvider maxSnack={3}>
      {isAuthResolved ? <AppRoutes /> : <FullSizeProgress />}
    </SnackbarProvider>
  );
};

export default App;
