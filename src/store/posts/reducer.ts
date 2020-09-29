import {
  ADD_POST_SUCCESS,
  FETCH_POSTS_SUCCESS,
  IPostsReducer,
  PostsActionsType,
  REMOVE_POST_SUCCESS,
} from './types';
import { LOGOUT } from '../auth/login/types';

export const initialState: IPostsReducer = {
  posts: [],
};

export const postsReducer = (
  state: IPostsReducer = initialState,
  action: PostsActionsType,
): IPostsReducer => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, posts: [action.payload, ...state.posts] };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return { ...state };
  }
};
