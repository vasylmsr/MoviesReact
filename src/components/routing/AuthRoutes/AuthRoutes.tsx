import React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import AuthLayout from '../../Layouts/AuthLayout/AuthLayout';
import { ISingleRoute } from '../../../routes';
import RouteSuspense from '../RouteSuspense/RouteSuspense';

type AuthRoutesProps = {
  routes: Array<ISingleRoute>;
};

export const AuthRoutes: React.FC<AuthRoutesProps> = ({ routes }: AuthRoutesProps): JSX.Element => {
  const location = useLocation();
  return (
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
  );
};
