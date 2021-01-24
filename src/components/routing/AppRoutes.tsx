// Core
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { landingRoute } from 'routes';
import { AUTH_LAYOUT } from 'utils/constants/layouts';

import { useSpecialRoutes } from 'hooks/useSpecialRoutes';
import { AuthRoutes } from './AuthRoutes/AuthRoutes';
import { RouteSuspense } from './RouteSuspense/RouteSuspense';
import { HomeRoutes } from './HomeRoutes/HomeRoutes';

const NotFound = React.lazy(() => import('containers/NotFound/NotFound'));

export const AppRoutes: React.FC = () => {
  const { specialRoutesPaths: authPaths, specialRoutes: authRoutes } = useSpecialRoutes(route =>
    Boolean(route.layout === AUTH_LAYOUT),
  );

  const {
    specialRoutesPaths: privatePaths,
    specialRoutes: privateRoutes,
  } = useSpecialRoutes(route => Boolean(route.isPrivate));

  const Landing = landingRoute!.component;

  return (
    <Switch>
      <Route exact path="/">
        <RouteSuspense>
          <Landing />
        </RouteSuspense>
      </Route>

      <Route path={authPaths}>
        <AuthRoutes routes={authRoutes} />
      </Route>

      <Route path={privatePaths}>
        <HomeRoutes routes={privateRoutes} />
      </Route>

      <Route path="*">
        <RouteSuspense>
          <NotFound />
        </RouteSuspense>
      </Route>
    </Switch>
  );
};
