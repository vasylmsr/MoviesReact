import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { SIGN_IN } from 'utils/constants/routes';
import RouteSuspense from '../RouteSuspense/RouteSuspense';

export const PrivateRoute: React.FC<RouteProps> = props => {
  const { component, path, ...otherProps } = props;
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Route
      path={path}
      render={componentProps => {
        return user ? (
          <RouteSuspense>
            <Route component={component} {...componentProps} />
          </RouteSuspense>
        ) : (
          <Redirect to={SIGN_IN} />
        );
      }}
      {...otherProps}
    />
  );
};
