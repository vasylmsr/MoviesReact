import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch, useLocation } from 'react-router';
import AuthLayout from '../../Layouts/AuthLayout/AuthLayout';
import { ISingleRoute } from '../../../routes';

type AuthRoutesProps = {
  routes: Array<ISingleRoute>;
};

export const AuthRoutes: React.FC<AuthRoutesProps> = ({ routes }: AuthRoutesProps): JSX.Element => {
  const location = useLocation();
  return (
    <AuthLayout>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="slide" timeout={1000} component={null}>
          <Switch location={location}>
            {routes.map((route: ISingleRoute) => (
              <Route exact path={route.path} key={route.path} component={route.component} />
            ))}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </AuthLayout>
  );
};
