import React, { lazy } from 'react';
import { ISingleRoute } from 'routes';
import { RouteSuspense } from '../RouteSuspense/RouteSuspense';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

const HomeLayout = lazy(() => import('../../layouts/HomeLayout/HomeLayout'));

type AuthRoutesProps = {
  routes: Array<ISingleRoute>;
};

export const HomeRoutes: React.FC<AuthRoutesProps> = ({ routes }) => {
  return (
    <RouteSuspense>
      <HomeLayout>
        {routes.map((route: ISingleRoute) => (
          <PrivateRoute exact key={route.path} {...route} />
        ))}
      </HomeLayout>
    </RouteSuspense>
  );
};
