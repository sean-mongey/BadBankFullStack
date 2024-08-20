// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-6p_w7_wyB1AkeQXbq6H4cXAoemi4qxM",
    authDomain: "seanmongeybadbank.firebaseapp.com",
    projectId: "seanmongeybadbank",
    storageBucket: "seanmongeybadbank.appspot.com",
    messagingSenderId: "308698475800",
    appId: "1:308698475800:web:ac9885a16c1f5bc2bb026d"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
