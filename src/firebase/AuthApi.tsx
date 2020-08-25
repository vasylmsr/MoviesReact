import * as app from 'firebase/app';
import 'firebase/auth';
import db from './Firebase';
import { IUserProfile } from '../store/auth/login/types';

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

export const doSignInWithEmailAndPassword = async ({ email, password }: IUserLoginCredentials) => {
  const response: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(
    email,
    password,
  );
  return getUserProfile(response.user!.uid);
};

export const doSignInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then(res => console.log(res));
};

export const onAuthStateChanged = (callback: any) => auth.onAuthStateChanged(callback);

export const doLogout = () => auth.signOut();
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
