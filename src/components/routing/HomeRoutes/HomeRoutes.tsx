import React, { lazy } from 'react';
import { ISingleRoute } from '../../../routes';
import RouteSuspense from '../RouteSuspense/RouteSuspense';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

const HomeLayout = lazy(() => import('../../Layouts/HomeLayout/HomeLayout'));

type AuthRoutesProps = {
  routes: Array<ISingleRoute>;
};

const HomeRoutes: React.FC<AuthRoutesProps> = ({ routes }) => {
  return (
    <RouteSuspense>
      <HomeLayout>
        {routes.map((route: ISingleRoute) => (
          <PrivateRoute component={route.component} path={route.path} key={route.path} />
        ))}
      </HomeLayout>
    </RouteSuspense>
  );
};

export default HomeRoutes;
