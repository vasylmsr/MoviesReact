import * as AuthApi from '../../firebase/AuthApi';
import { IPostData } from '../../firebase/AuthApi';

export const addPost = (postData: IPostData) => (dispatch: any, getState: any) => {
  const { user } = getState().auth;
  return AuthApi.createPost(postData, user.uid);
};
