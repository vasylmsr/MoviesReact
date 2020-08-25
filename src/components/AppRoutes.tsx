import React, { useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout/AuthLayout';
import routes, { ISingleRoute, landingRoute } from '../routes';
import { AUTH_LAYOUT } from '../utils/constants/layouts';
import { HomeLayout } from './Layouts/HomeLayout/HomeLayout';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';

function useSpecialRoutes(getRoutesCallback: (route: ISingleRoute) => boolean) {
  const specialRoutes = useMemo(
    () => routes.filter((route: ISingleRoute) => getRoutesCallback(route)),
    [getRoutesCallback],
  );
  const specialRoutesPaths: Array<string> = useMemo(
    () => specialRoutes.map((route: ISingleRoute) => route.path),
    [specialRoutes],
  );

  return { specialRoutes, specialRoutesPaths };
}

export const AppRoutes: React.FC = (): JSX.Element => {
  const { specialRoutesPaths: authPaths, specialRoutes: authRoutes } = useSpecialRoutes(route =>
    Boolean(route.layout === AUTH_LAYOUT),
  );
  const {
    specialRoutesPaths: privatePaths,
    specialRoutes: privateRoutes,
  } = useSpecialRoutes(route => Boolean(route.isPrivate));
  return (
    <>
      <Switch>
        <Route exact component={landingRoute!.component} path={landingRoute!.path} />
        <Route path={authPaths}>
          <AuthLayout>
            {authRoutes.map((route: ISingleRoute) => (
              <Route exact path={route.path} key={route.path} component={route.component} />
            ))}
          </AuthLayout>
        </Route>
        <Route path={privatePaths}>
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
