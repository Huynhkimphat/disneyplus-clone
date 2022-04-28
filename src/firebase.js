import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBUOPorPxYTUFYyrA8mE4PD6fuecs8fTVw',
  authDomain: 'disneyplus-clone-f5a24.firebaseapp.com',
  projectId: 'disneyplus-clone-f5a24',
  storageBucket: 'disneyplus-clone-f5a24.appspot.com',
  messagingSenderId: '902548170117',
  appId: '1:902548170117:web:b8e188b9555aa61e9d10ec',
  measurementId: 'G-PK4NRS7HHG',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
