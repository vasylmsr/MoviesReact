import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ISingleRoute, landingRoute } from '../routes';
import { AUTH_LAYOUT } from '../utils/constants/layouts';
import { HomeLayout } from './Layouts/HomeLayout/HomeLayout';
import { PrivateRoute } from './routing/PrivateRoute/PrivateRoute';
import '../App.css';

import { useSpecialRoutes } from './hooks/useSpecialRoutes';
import { AuthRoutes } from './routing/AuthRoutes/AuthRoutes';

export const AppRoutes: React.FC = (): JSX.Element => {
  const { specialRoutesPaths: authPaths, specialRoutes: authRoutes } = useSpecialRoutes(route =>
    Boolean(route.layout === AUTH_LAYOUT),
  );

  const { specialRoutes: privateRoutes } = useSpecialRoutes(route => Boolean(route.isPrivate));

  return (
    <>
      <Switch>
        <Route exact component={landingRoute!.component} path={landingRoute!.path} />
        <Route path={authPaths}>
          <AuthRoutes routes={authRoutes} />
        </Route>
        <Route path="*">
          <HomeLayout>
            {privateRoutes.map((route: ISingleRoute) => (
              <PrivateRoute component={route.component} path={route.path} key={route.path} />
            ))}
          </HomeLayout>
        </Route>
      </Switch>
    </>
  );
};
