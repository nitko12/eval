import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuAoWplrrCZdoRQxPYiHngiDxeF31emgc",
  authDomain: "eval-5cdca.firebaseapp.com",
  databaseURL: "https://eval-5cdca.firebaseio.com",
  projectId: "eval-5cdca",
  storageBucket: "eval-5cdca.appspot.com",
  messagingSenderId: "946342511577",
  appId: "1:946342511577:web:5f2f66b9ebd5b3cd6e8fc8",
  measurementId: "G-8BD787R2QH",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
