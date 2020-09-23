import React, { lazy } from 'react';
import { AUTH_LAYOUT } from './utils/constants/layouts';
import { FORGOT_PASSWORD, HOME, MAIN, SIGN_IN, SIGN_UP } from './utils/constants/routes';

const SignIn = lazy(() => import('./containers/auth/SignIn/SignIn'));
const SignUp = lazy(() => import('./containers/auth/Register/SignUp'));
const PostsListPage = lazy(() => import('./containers/Posts/PostsListPage'));
const Landing = lazy(() => import('./containers/Landing'));
const EmailLink = lazy(() => import('./containers/auth/EmailLink/EmailLink'));
const ForgotPassword = lazy(() => import('./containers/auth/ForgotPassword/ForgotPassword'));

export interface ISingleRoute {
  path: string;
  component: React.ComponentType;
  layout?: string;
  isPrivate?: boolean;
}

export type routesType = Array<ISingleRoute>;

const routes: routesType = [
  {
    path: MAIN,
    component: Landing,
  },
  {
    path: SIGN_IN,
    component: SignIn,
    layout: AUTH_LAYOUT,
  },
  {
    path: SIGN_UP,
    component: SignUp,
    layout: AUTH_LAYOUT,
  },
  {
    path: HOME,
    component: PostsListPage,
    isPrivate: true,
  },
  {
    path: '/confirm',
    component: EmailLink,
    layout: AUTH_LAYOUT,
  },
  {
    path: FORGOT_PASSWORD,
    component: ForgotPassword,
    layout: AUTH_LAYOUT,
  },
];

export const landingRoute = routes.find(route => route.path === MAIN);

export default routes;
