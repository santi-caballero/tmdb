// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCtBbn0OICtPVuk7QKyqXUjne9YnoKCl64",

  authDomain: "tmdb-d56fb.firebaseapp.com",

  projectId: "tmdb-d56fb",

  storageBucket: "tmdb-d56fb.appspot.com",

  messagingSenderId: "645303805744",

  appId: "1:645303805744:web:2fe65079857bb270c34af5",

  measurementId: "G-7Y67TW2PYF",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
