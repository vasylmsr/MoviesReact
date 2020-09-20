import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { SIGN_IN } from '../../../utils/constants/routes';

type IPrivateRouteProps = RouteProps;

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component,
  path,
  ...props
}: IPrivateRouteProps): JSX.Element => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Route
      path={path}
      render={componentProps => {
        return user ? (
          <Route component={component} {...componentProps} />
        ) : (
          <Redirect to={SIGN_IN} />
        );
      }}
      {...props}
    />
  );
};
