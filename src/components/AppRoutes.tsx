import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ISingleRoute, landingRoute } from '../routes';
import { AUTH_LAYOUT } from '../utils/constants/layouts';
import { HomeLayout } from './Layouts/HomeLayout/HomeLayout';
import { PrivateRoute } from './routing/PrivateRoute/PrivateRoute';
import '../App.css';

import { useSpecialRoutes } from './hooks/useSpecialRoutes';
import { AuthRoutes } from './routing/AuthRoutes/AuthRoutes';
import RouteSuspense from './routing/RouteSuspense/RouteSuspense';

export const AppRoutes: React.FC = (): JSX.Element => {
  const { specialRoutesPaths: authPaths, specialRoutes: authRoutes } = useSpecialRoutes(route =>
    Boolean(route.layout === AUTH_LAYOUT),
  );

  const { specialRoutes: privateRoutes } = useSpecialRoutes(route => Boolean(route.isPrivate));
  const Landing = landingRoute!.component;
  return (
    <>
      <Switch>
        <Route exact path={landingRoute!.path}>
          <RouteSuspense>
            <Landing />
          </RouteSuspense>
        </Route>
        <Route path={authPaths}>
          <AuthRoutes routes={authRoutes} />
        </Route>
        <Route path="*">
          <HomeLayout>
            {privateRoutes.map((route: ISingleRoute) => (
              <RouteSuspense>
                <PrivateRoute component={route.component} path={route.path} key={route.path} />
              </RouteSuspense>
            ))}
          </HomeLayout>
        </Route>
      </Switch>
    </>
  );
};
