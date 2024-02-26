
import react from "react"
import { useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
async function checkLogin(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
         
          return user
          // ...
        } else {
          // User is signed out
          // ...
          return "Nothing"
        }
      });
}

export default checkLogin