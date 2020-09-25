import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { ISingleRoute } from '../../../routes';
import RouteSuspense from '../RouteSuspense/RouteSuspense';

const AuthLayout = lazy(() => import('../../Layouts/AuthLayout/AuthLayout'));

type AuthRoutesProps = {
  routes: Array<ISingleRoute>;
};

export const NoAuthRoutes: React.FC<AuthRoutesProps> = ({ routes }: AuthRoutesProps): JSX.Element => {
  const location = useLocation();
  return (
    <RouteSuspense>
      <AuthLayout>
        <Switch location={location}>
          {routes.map((route: ISingleRoute) => (
            <Route
              exact
              path={route.path}
              key={route.path}
              render={() => {
                return (
                  <RouteSuspense>
                    <Route component={route.component} path={route.path} />
                  </RouteSuspense>
                );
              }}
            />
          ))}
        </Switch>
      </AuthLayout>
    </RouteSuspense>
  );
};
