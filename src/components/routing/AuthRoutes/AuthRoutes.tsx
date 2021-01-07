import React, { lazy } from 'react';
import { Switch, useLocation } from 'react-router';
import { ISingleRoute } from '../../../routes';
import { RouteSuspense } from '../RouteSuspense/RouteSuspense';
import { AuthRoute } from '../AuthRoute/AuthRoute';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css';

const AuthLayout = lazy(() => import('../../layouts/AuthLayout/AuthLayout'));

type AuthRoutesProps = {
  routes: Array<ISingleRoute>;
};

export const AuthRoutes: React.FC<AuthRoutesProps> = React.memo(({ routes }) => {
  const location = useLocation();
  return (
    <RouteSuspense>
      <AuthLayout>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={1000} classNames="page" unmountOnExit in>
            <div className="page">
              <Switch location={location}>
                {routes.map((route: ISingleRoute) => (
                  <AuthRoute key={route.path} component={route.component} path={route.path} />
                ))}
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </AuthLayout>
    </RouteSuspense>
  );
});
