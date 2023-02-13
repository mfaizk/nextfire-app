import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTFLSIUJq9aMkFoI04w_tHJletEfq4CLk",
  authDomain: "nextfire-app-49bb6.firebaseapp.com",
  projectId: "nextfire-app-49bb6",
  storageBucket: "nextfire-app-49bb6.appspot.com",
  messagingSenderId: "1042560576957",
  appId: "1:1042560576957:web:d79d4344b3346b7fdfb6d4",
  measurementId: "G-R47MCJ7YPM",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
