const { initializeApp } = require('@firebase/app');
const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, getDoc } = require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCozqtU31BXepbw2pk-IoFgUGCmD1KTAH8",
    authDomain: "imdb-db24f.firebaseapp.com",
    projectId: "imdb-db24f",
    storageBucket: "imdb-db24f.appspot.com",
    messagingSenderId: "335576641763",
    appId: "1:335576641763:web:4d7d1a141743dfc89f95d6",
    measurementId: "G-5C9R0TP296"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const moviesRef = collection(db, 'movies');
const usersRef = collection(db, 'users')

module.exports = { db, getDocs, addDoc, usersRef, updateDoc, moviesRef, doc, getDoc };
