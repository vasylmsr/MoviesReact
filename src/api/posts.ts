import * as app from 'firebase';
import db from './db';
import { IPostData } from './auth';
import { createRef, POSTS_COLLECTION, PROFILES_COLLECTION } from './helpers';

const modifyPostFromFirebase = async (post: any) => {
  const user = await post.user.get().then((snap: any) => snap.data());
  return {
    ...post,
    user,
    createdAt: post.createdAt.toDate(),
    updatedAt: post.updatedAt.toDate(),
  };
};

export const fetchPost = async (postId: string) => {
  const snapshot: any = await db.doc(`${POSTS_COLLECTION}/${postId}`).get();
  return modifyPostFromFirebase(snapshot.data());
};

export const createPost = async (postData: IPostData, uid: string) => {
  const timestamp = app.firestore.FieldValue.serverTimestamp();
  const fullPostData = {
    ...postData,
    createdAt: timestamp,
    updatedAt: timestamp,
    user: createRef('profiles', uid),
  };
  const { id } = await db.collection(POSTS_COLLECTION).add(fullPostData);
  await db.doc(`posts/${id}`).update({
    ...fullPostData,
    id,
  });
  return fetchPost(id);
};

export const editPost = async (postData: IPostData) => {
  const postId = postData.id;
  const timestamp = app.firestore.FieldValue.serverTimestamp();
  const fullPostData = {
    ...postData,
    updatedAt: timestamp,
  };
  await db.doc(`posts/${postId}`).update(fullPostData);
  return fetchPost(postId);
};

export const getPosts = async (uid: string): Promise<Array<IPostData>> => {
  const snapshot = await db
    .collection(POSTS_COLLECTION)
    .where('user', '==', createRef(PROFILES_COLLECTION, uid))
    .get();
  const serverPosts = snapshot.docs.map(doc => doc.data()) as Array<IPostData>;
  return Promise.all(serverPosts.map((post: IPostData) => modifyPostFromFirebase(post)));
};
