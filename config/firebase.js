// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


// import fire
// import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDWWNZF3RKIWxE80gE9kPoFq9pzNcBBbMw",
    authDomain: "bhagavad-gita-app-official.firebaseapp.com",
    projectId: "bhagavad-gita-app-official",
    storageBucket: "bhagavad-gita-app-official.appspot.com",
    messagingSenderId: "420870778500",
    appId: "1:420870778500:web:b926bbc3b62e4046b51cd1",
    measurementId: "G-85RH8HCYML"
};

// if (!firebase.apps.length) {
//  firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export  {app,auth,db}
