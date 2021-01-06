import React, { lazy } from 'react';
import { AUTH_LAYOUT } from './utils/constants/layouts';
import {
  CONFIRM_EMAIL_LINK,
  FORGOT_PASSWORD,
  HOME,
  MAIN,
  SIGN_IN,
  SIGN_UP,
  USER_PROFILE_ROUTE,
} from './utils/constants/routes';

const SignIn = lazy(() => import('./containers/auth/SignIn/SignIn'));
const SignUp = lazy(() => import('./containers/auth/SignUp/SignUp'));
const PostsListPage = lazy(() => import('./containers/Posts/PostsListPage'));
const Landing = lazy(() => import('./containers/Landing'));
const EmailLink = lazy(() => import('./containers/auth/EmailLink/EmailLink'));
const ForgotPassword = lazy(() => import('./containers/auth/ForgotPassword/ForgotPassword'));
const UserProfile = lazy(() => import('./containers/UserProfile/UserProfile'));

export interface ISingleRoute {
  path: string;
  component: React.ComponentType;
  layout?: string;
  isPrivate?: boolean;
  isUserEmailConfirmed?: boolean;
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
    path: USER_PROFILE_ROUTE,
    component: UserProfile,
    isPrivate: true,
    isUserEmailConfirmed: false,
  },
  {
    path: HOME,
    component: PostsListPage,
    isPrivate: true,
    isUserEmailConfirmed: true,
  },
  {
    path: CONFIRM_EMAIL_LINK,
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
