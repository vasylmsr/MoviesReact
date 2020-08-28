import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, IPostsReducer, PostsActionsType } from './types';
import { IDLE_STATUS, LOADING_STATUS } from '../../utils/constants/other';

export const initialState: IPostsReducer = {
  posts: [],

  fetchPostsStatus: IDLE_STATUS,
  fetchPostsError: null,

  removePostStatus: IDLE_STATUS,
  removePostError: null,
};

export const postsReducer = (
  state: IPostsReducer = initialState,
  action: PostsActionsType,
): IPostsReducer => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return { ...state, fetchPostsStatus: LOADING_STATUS };
    }
    case FETCH_POSTS_SUCCESS: {
      return { ...state, fetchPostsStatus: LOADING_STATUS };
    }
    default:
      return { ...state };
  }
};
