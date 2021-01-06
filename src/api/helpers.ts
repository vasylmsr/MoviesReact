import db from './db';

export const POSTS_COLLECTION: string = 'posts';
export const PROFILES_COLLECTION: string = 'profiles';

export const createRef = (collection: string, docId: string) => db.doc(`${collection}/${docId}`);
