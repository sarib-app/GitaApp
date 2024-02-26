
import react from "react"
import { useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GetAsyncData=()=>{
//   return "heheh"
    
  const  getLocal = AsyncStorage.getItem("user")
  const ParsedUser = JSON.parse(getLocal)
  console.log(ParsedUser)
  if(ParsedUser){
    return ParsedUser
  }
  else{
    return null
  }

}

export default GetAsyncData