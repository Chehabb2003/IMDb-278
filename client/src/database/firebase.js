import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAGyDi7ib62yH7MOLxk9Vz7D8haqcH6mv4",
    authDomain: "imdb-2-f2ef1.firebaseapp.com",
    projectId: "imdb-2-f2ef1",
    storageBucket: "imdb-2-f2ef1.appspot.com",
    messagingSenderId: "60510739375",
    appId: "1:60510739375:web:b32bea498a05c3dd0eed5a"
};

// // init firebase app
initializeApp(firebaseConfig);


// // init services
const db = getFirestore()


//export to use 
export { db };

