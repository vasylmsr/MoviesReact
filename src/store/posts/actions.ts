import * as PostsApi from '../../api/posts';
import { IPostData } from '../../api/auth';
import { IApiError } from '../../utils/constants/other';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  FETCH_POSTS_FAILED,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from './types';

export const fetchPostsFailure = (error: IApiError) => ({
  type: FETCH_POSTS_FAILED,
  payload: error,
});
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
  payload: null,
});
export const fetchPostsSuccess = (posts: Array<IPostData>) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const addPostFailure = (error: IApiError) => ({
  type: ADD_POST_FAILURE,
  payload: error,
});
export const addPostRequest = () => ({
  type: ADD_POST_REQUEST,
  payload: null,
});
export const addPostSuccess = (post: IPostData) => ({
  type: ADD_POST_SUCCESS,
  payload: post,
});

export const addPost = (postData: IPostData) => async (dispatch: any, getState: any) => {
  dispatch(addPostRequest());
  try {
    const { user } = getState().auth;
    const newPost: IPostData = await PostsApi.createPost(postData, user.uid);
    dispatch(addPostSuccess(newPost));
  } catch (error) {
    dispatch(addPostFailure(error));
  }
};

export const getPosts = () => async (dispatch: any, getState: any) => {
  dispatch(fetchPostsRequest());
  try {
    const { user } = getState().auth;
    const posts: Array<IPostData> = await PostsApi.fetchPosts(user.uid);
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsFailure(error));
  }
};
