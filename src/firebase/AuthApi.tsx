import * as app from 'firebase/app';
import 'firebase/auth';
import db from './Firebase';
import { IUserProfile } from '../store/auth/login/types';

const POSTS_COLLECTION = 'posts';

export interface IUserLoginCredentials {
  email: string;
  password: string;
}

export interface IUserRegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const auth = app.auth();
const googleProvider = new app.auth.GoogleAuthProvider();

export function createUserProfile(userData: any) {
  return db.collection('profiles').doc(userData?.uid).set(userData);
}

export async function getUserProfile(uid: string): Promise<IUserProfile> {
  const snapshot = await db.collection('profiles').doc(uid).get();
  const { firstName, lastName } = snapshot.data()!;
  return { uid, firstName, lastName };
}

export async function doCreateUserWithEmailAndPassword({
  email,
  password,
  firstName,
  lastName,
}: IUserRegisterCredentials) {
  const response = await auth.createUserWithEmailAndPassword(email, password);
  await createUserProfile({ uid: response?.user?.uid, firstName, lastName });
  const user = auth.currentUser;
  await user?.sendEmailVerification();
  return user;
}

export const doSignInWithEmailAndPassword = async ({
  email,
  password,
}: IUserLoginCredentials): Promise<firebase.auth.UserCredential> =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then(res => console.log(res));
};

export const onAuthStateChanged = (callback: any) => auth.onAuthStateChanged(callback);

export const doLogout = () => auth.signOut();

export const applyActionCode = (code: string) => auth.applyActionCode(code);

export const createRef = (collection: string, docId: string) => db.doc(`${collection}/${docId}`);

export const sendPasswordResetEmail = (email: string) => auth.sendPasswordResetEmail(email);

export const confirmPasswordReset = (code: string, newPassword: string) =>
  auth.confirmPasswordReset(code, newPassword);
// title
// description
// updatedAt
// const createdAt = app.database.ServerValue.TIMESTAMP;
// user
// photo
// redirect_url
// location

export interface IPostData {
  title: string;
  description: string;
  photoUrl?: string;
  originalPostUrl?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  user: string;
}
export const createPost = (postData: IPostData, uid: string) => {
  const timestamp = app.firestore.FieldValue.serverTimestamp();
  const fullPostData = {
    ...postData,
    createdAt: timestamp,
    updatedAt: timestamp,
    user: createRef(POSTS_COLLECTION, uid),
  };
  return db.collection(POSTS_COLLECTION).add(fullPostData);
};

export const editPost = (postData: IPostData) => {
  const timestamp = app.firestore.FieldValue.serverTimestamp();
  const fullPostData = {
    ...postData,
    updatedAt: timestamp,
  };
  return db.collection(POSTS_COLLECTION).add(fullPostData);
};
//
// doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);
//
// doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);
//
// doSignOut = () => this.auth.signOut();
//
// doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
//
// doSendEmailVerification = () =>
//   this.auth.currentUser.sendEmailVerification({
//     url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
//   });
//
// doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
//
// // *** Merge Auth and DB User API *** //
