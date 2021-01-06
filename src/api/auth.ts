import app from 'firebase/app';
import 'firebase/auth';
import db from './db';
import { IUserProfile } from 'store/auth/types';
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
  const { displayName, emailVerified, email } = snapshot.data()!;
  return { uid, displayName, emailVerified, email };
}

export async function doCreateUserWithEmailAndPassword({
  email,
  password,
  firstName,
  lastName,
}: IUserRegisterCredentials) {
  await auth.createUserWithEmailAndPassword(email, password);
  const user = auth.currentUser;
  await user!.updateProfile({
    displayName: `${firstName} ${lastName}`,
  });

  await user!.sendEmailVerification();
  return user;
}

export const doSignInWithEmailAndPassword = ({
  email,
  password,
}: IUserLoginCredentials): Promise<firebase.auth.UserCredential> =>
  auth.signInWithEmailAndPassword(email, password);

type authStateChangedCallbackType = (user: firebase.User | null) => void;
export const onAuthStateChanged = (callback: authStateChangedCallbackType) =>
  auth.onAuthStateChanged(callback);

export const doLogout = (): Promise<any> => auth.signOut();

export const applyActionCode = (code: string): Promise<any> => auth.applyActionCode(code);

export const sendPasswordResetEmail = (email: string): Promise<any> =>
  auth.sendPasswordResetEmail(email);

export const confirmPasswordReset = (code: string, newPassword: string): Promise<any> =>
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
