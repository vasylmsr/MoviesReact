import {
  ADD_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  FETCH_POSTS_SUCCESS,
  IPostsReducer,
  PostsActionsType,
  REMOVE_POST_SUCCESS,
} from './types';

export const initialState: IPostsReducer = {
  posts: [],
};

export const getArrayWithUpdatedObject = (updatedObject: any, arr: any) => {
  const newArr = [...arr];
  const indexUpdatedObject = newArr.findIndex(item => updatedObject.id === item.id);
  newArr[indexUpdatedObject] = { ...updatedObject };
  return newArr;
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
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        posts: getArrayWithUpdatedObject(action.payload, state.posts),
      };
    default:
      return { ...state };
  }
};
