import * as PostsApi from '../../api/posts';
import { IPostData } from '../../api/auth';
import {
  ADD_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  FETCH_POSTS_SUCCESS, IAddPostSuccess,
  IEditPostSuccess,
  IRemovePostSuccess,
  REMOVE_POST_SUCCESS
} from "./types";
import store from '../index';

const { dispatch: storeDispatch } = store;

export const fetchPostsSuccess = (posts: Array<IPostData>) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const addPostSuccess = (post: IPostData): IAddPostSuccess => ({
  type: ADD_POST_SUCCESS,
  payload: post,
});

export const removePostSuccess = (postId: string): IRemovePostSuccess => ({
  type: REMOVE_POST_SUCCESS,
  payload: postId,
});

export const editPostSuccess = (post: IPostData): IEditPostSuccess => ({
  type: EDIT_POST_SUCCESS,
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

export const removePost = (postId: string) => async (dispatch: any) => {
  await PostsApi.removePost(postId);
  dispatch(removePostSuccess(postId));
};

export const editPost = (postData: IPostData) => async (dispatch: any, getState: any) => {
  const newPostData = await PostsApi.editPost(postData);
  dispatch(editPostSuccess(newPostData));
};

// Todo: fix ts-ignore
// @ts-ignore
export const boundAddPost = (postData: IPostData) => store.dispatch(addPost(postData));
// @ts-ignore
export const boundGetPosts = () => storeDispatch(getPosts());
// @ts-ignore
export const boundRemovePost = postId => storeDispatch(removePost(postId));
// @ts-ignore
export const boundEditPost = postId => storeDispatch(editPost(postId));
