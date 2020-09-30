import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAcQBcQqCVyRaAbL7imNQFYjbEflFFX3K4",
  authDomain: "insta-clone-42515.firebaseapp.com",
  databaseURL: "https://insta-clone-42515.firebaseio.com",
  projectId: "insta-clone-42515",
  storageBucket: "insta-clone-42515.appspot.com",
  messagingSenderId: "1003167307948",
  appId: "1:1003167307948:web:1e0d2e67d09a2f76eee709",
  measurementId: "G-1ZL03GZN57",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default db;
