import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { MOVIES_ROUTE } from 'utils/constants/routes';
import { RootStateType } from 'store';
import { RouteSuspense } from '../RouteSuspense/RouteSuspense';
import '../AuthRoutes/styles.css';

export const AuthRoute: React.FC<RouteProps> = props => {
  const { component, path, ...otherProps } = props;
  const { user } = useSelector((state: RootStateType) => state.auth);
  return (
    <Route
      path={path}
      render={componentProps => {
        return user ? (
          <Redirect to={MOVIES_ROUTE} />
        ) : (
          <RouteSuspense>
            <Route component={component} {...componentProps} />
          </RouteSuspense>
        );
      }}
      {...otherProps}
    />
  );
};
