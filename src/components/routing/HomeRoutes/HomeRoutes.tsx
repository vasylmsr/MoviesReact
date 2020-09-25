import React, { lazy } from 'react';
import { ISingleRoute } from '../../../routes';
import RouteSuspense from '../RouteSuspense/RouteSuspense';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

const HomeLayout = lazy(() => import('../../Layouts/HomeLayout/HomeLayout'));

type AuthRoutesProps = {
  routes: Array<ISingleRoute>;
};

const HomeRoutes: React.FC<AuthRoutesProps> = ({ routes }: AuthRoutesProps) => {
  return (
    <RouteSuspense>
      <HomeLayout>
        {routes.map((route: ISingleRoute) => (
          <RouteSuspense>
            <PrivateRoute component={route.component} path={route.path} key={route.path} />
          </RouteSuspense>
        ))}
      </HomeLayout>
    </RouteSuspense>
  );
};

export default HomeRoutes;
