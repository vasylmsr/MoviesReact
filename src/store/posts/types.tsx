import { IApiError, LoadingType } from '../../utils/constants/other';
export const ADD_POST_REQUEST = 'CHECK_USER_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export interface IPostsReducer {
  posts: Array<object>;

  fetchPostsStatus: LoadingType;
  fetchPostsError: IApiError | null;

  removePostStatus: LoadingType;
  removePostError: IApiError | null;
}

export interface IFetchPostsSuccess {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: any;
}

export interface IFetchPostsFailure {
  type: typeof FETCH_POSTS_FAILED;
  payload: any;
}

export interface IFetchPostsRequest {
  type: typeof FETCH_POSTS_REQUEST;
  payload: any;
}

export type PostsActionsType = IFetchPostsSuccess | IFetchPostsFailure | IFetchPostsRequest;
