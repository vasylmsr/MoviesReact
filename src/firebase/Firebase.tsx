import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyA6XyhCOR3yTYZ3f9qIfET2U2wGKJNpTj4',
  authDomain: 'todo-mysiura.firebaseapp.com',
  databaseURL: 'https://todo-mysiura.firebaseio.com',
  projectId: 'todo-mysiura',
  storageBucket: 'todo-mysiura.appspot.com',
  messagingSenderId: '978112272773',
  appId: '1:978112272773:web:b2b952d3254f5991440cec',
  measurementId: 'G-Z0CW9F0F3T',
};

export default firebase.initializeApp(config).firestore();
