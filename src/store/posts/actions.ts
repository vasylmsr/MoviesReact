import * as PostsApi from '../../api/posts';
import { IPostData } from '../../api/auth';
import { ADD_POST_SUCCESS, FETCH_POSTS_SUCCESS } from './types';
import store from '../index';

const { dispatch: storeDispatch } = store;

export const fetchPostsSuccess = (posts: Array<IPostData>) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const addPostSuccess = (post: IPostData) => ({
  type: ADD_POST_SUCCESS,
  payload: post,
});

export const addPost = (postData: IPostData) => async (dispatch: any, getState: any) => {
  const { user } = getState().auth;
  const newPost: IPostData = await PostsApi.createPost(postData, user.uid);
  dispatch(addPostSuccess(newPost));
};

export const getPosts = () => async (dispatch: any, getState: any) => {
  const { user } = getState().auth;
  const posts: Array<IPostData> = await PostsApi.fetchPosts(user.uid);
  dispatch(fetchPostsSuccess(posts));
};

// @ts-ignore
export const boundAddPost = (postData: IPostData) => store.dispatch(addPost(postData));
// @ts-ignore
export const boundGetPosts = () => storeDispatch(getPosts());
