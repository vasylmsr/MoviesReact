import { IPostData } from '../../api/main/auth';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';

export interface IPostsReducer {
  posts: Array<IPostData>;
}

export interface IFetchPostsSuccess {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: any;
}

export interface IAddPostSuccess {
  type: typeof ADD_POST_SUCCESS;
  payload: IPostData;
}

export interface IRemovePostSuccess {
  type: typeof REMOVE_POST_SUCCESS;
  payload: string;
}

export interface IEditPostSuccess {
  type: typeof EDIT_POST_SUCCESS;
  payload: IPostData;
}

export type PostsActionsType =
  | IFetchPostsSuccess
  | IAddPostSuccess
  | IRemovePostSuccess
  | IEditPostSuccess;
