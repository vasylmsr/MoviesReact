import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { landingRoute } from '../../routes';
import { AUTH_LAYOUT } from '../../utils/constants/layouts';
import '../../App.css';

import { useSpecialRoutes } from '../hooks/useSpecialRoutes';
import { NoAuthRoutes } from './NoAuthRoutes/NoAuthRoutes';
import RouteSuspense from './RouteSuspense/RouteSuspense';
import HomeRoutes from './HomeRoutes/HomeRoutes';
import NotFound from '../../containers/NotFound/NotFound';

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
      <Route exact path={landingRoute!.path}>
        <RouteSuspense>
          <Landing />
        </RouteSuspense>
      </Route>

      <Route path={authPaths}>
        <NoAuthRoutes routes={authRoutes} />
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
