import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { SIGN_IN, USER_PROFILE_ROUTE } from 'utils/constants/routes';
import { RootStateType } from 'store';
import { ISingleRoute } from 'routes';
import { useSnackbar } from 'notistack';
import { RouteSuspense } from '../RouteSuspense/RouteSuspense';

export const PrivateRoute: React.FC<RouteProps & ISingleRoute> = props => {
  const { component, path, isUserEmailConfirmed: isUserConfirmedRouteRule, ...otherProps } = props;
  const { user } = useSelector((state: RootStateType) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Route
      path={path}
      render={componentProps => {
        if (user) {
          if (isUserConfirmedRouteRule && !user.emailVerified) {
            enqueueSnackbar('Confirm your email before', { variant: 'error' });
            return <Redirect to={USER_PROFILE_ROUTE} />;
          }
          return (
            <RouteSuspense>
              <Route component={component} {...componentProps} />
            </RouteSuspense>
          );
        }

        return <Redirect to={SIGN_IN} />;
      }}
      {...otherProps}
    />
  );
};
