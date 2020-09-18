import db from './db';

export const POSTS_COLLECTION = 'posts';
export const PROFILES_COLLECTION = 'profiles';

export const createRef = (collection: string, docId: string) => db.doc(`${collection}/${docId}`);
