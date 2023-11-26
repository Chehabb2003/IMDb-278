const { initializeApp } = require('@firebase/app');
const { getFirestore, collection, getDocs, addDoc, updateDoc, Timestamp, doc, getDoc } = require('@firebase/firestore');
const { getStorage } = require('@firebase/storage');
// const admin = require('firebase-admin');

// const firebaseConfig = {
//     apiKey: "AIzaSyCozqtU31BXepbw2pk-IoFgUGCmD1KTAH8",
//     authDomain: "imdb-db24f.firebaseapp.com",
//     projectId: "imdb-db24f",
//     storageBucket: "imdb-db24f.appspot.com",
//     messagingSenderId: "335576641763",
//     appId: "1:335576641763:web:4d7d1a141743dfc89f95d6",
//     measurementId: "G-5C9R0TP296"
// };
const firebaseConfig = {
    apiKey: "AIzaSyAGyDi7ib62yH7MOLxk9Vz7D8haqcH6mv4",
    authDomain: "imdb-2-f2ef1.firebaseapp.com",
    projectId: "imdb-2-f2ef1",
    storageBucket: "imdb-2-f2ef1.appspot.com",
    messagingSenderId: "60510739375",
    appId: "1:60510739375:web:b32bea498a05c3dd0eed5a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const moviesRef = collection(db, 'movies');
const usersRef = collection(db, 'users');
const reviewRef = collection(db, 'reviews');
const actorsRef = collection(db, 'actors');

module.exports = { db, getDocs, addDoc, usersRef, updateDoc, moviesRef, storage, Timestamp, doc, getDoc, reviewRef, actorsRef };

