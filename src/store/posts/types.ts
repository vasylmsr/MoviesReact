import { IApiError, LoadingType } from '../../utils/constants/other';
import { ILogout } from '../auth/login/types';
import { IPostData } from '../../api/auth';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export interface IPostsReducer {
  posts: Array<IPostData>;
}

export interface IFetchPostsSuccess {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: any;
}

export interface IAddPostSuccess {
  type: typeof ADD_POST_SUCCESS;
  payload: any;
}

export interface IRemovePostSuccess {
  type: typeof REMOVE_POST_SUCCESS;
  payload: any;
}

export type PostsActionsType = IFetchPostsSuccess | IAddPostSuccess | IRemovePostSuccess | ILogout;
