import app from 'firebase/app';
import 'firebase/auth';
import db from './db';
import { IUserProfile } from '../store/auth/login/types';
import { PROFILES_COLLECTION } from './helpers';

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

export function createUserProfile(userData: any) {
  return db.collection(PROFILES_COLLECTION).doc(userData?.uid).set(userData);
}

export async function getUserProfile(uid: string): Promise<IUserProfile> {
  const snapshot = await db.collection(PROFILES_COLLECTION).doc(uid).get();
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

export const onAuthStateChanged = (callback: any) => auth.onAuthStateChanged(callback);

export const doLogout = () => auth.signOut();

export const applyActionCode = (code: string) => auth.applyActionCode(code);

export const sendPasswordResetEmail = (email: string) => auth.sendPasswordResetEmail(email);

export const confirmPasswordReset = (code: string, newPassword: string) =>
  auth.confirmPasswordReset(code, newPassword);

export interface IPostData {
  id: string;
  title: string;
  description: string;
  photoUrl?: string;
  originalPostUrl?: string;
  location?: string;
  createdAt: any;
  updatedAt: any;
  user: any;
}

// const googleProvider = new app.auth.GoogleAuthProvider();

// export const doSignInWithGoogle = () => {
//   auth.signInWithPopup(googleProvider).then(res => console.log(res));
// };

//
// doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);
//
// doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);
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
