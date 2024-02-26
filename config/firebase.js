// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


// import fire
// import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDlhfk0p_2OGO8ZWAXnmT4HFj4izaUZ9IU",
    authDomain: "bhagavad-gita-4207d.firebaseapp.com",
    projectId: "bhagavad-gita-4207d",
    storageBucket: "bhagavad-gita-4207d.appspot.com",
    messagingSenderId: "875778272132",
    appId: "1:875778272132:web:23e34dbcfe04e72ef04bd1",
    // measurementId: "G-M77Z7S655R"
};

// if (!firebase.apps.length) {
//  firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {app,auth}
