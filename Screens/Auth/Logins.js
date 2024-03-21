import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.png'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { auth } from '../../Components/Config/firebase'; // Adjust the path as needed
import { getAuth, signInWithCredential, signInWithEmailAndPassword,OAuthProvider,GoogleAuthProvider} from 'firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';


// const auth = getAuth()
import { auth } from '../../config/firebase';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
// import { GoogleAuthProvider } from "firebase/auth";
import {  signInWithPopup } from "firebase/auth";

// Create a new instance of GoogleAuthProvider
const provider = new GoogleAuthProvider();

// Add scope and custom parameters if needed
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});
WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
const navigation = useNavigation()

const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [Lang,setLang]=useState(Eng)
  const focused= useIsFocused()
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "420870778500-j6osd5lrhs1eimffc9cdj1hmrdd9hfec.apps.googleusercontent.com",
    iosClientId: "420870778500-bjdvpr3127ve30dhi0bsloib2g1d7da8.apps.googleusercontent.com",
    expoClientId: "420870778500-den8oc1mtl2es0opq4tu4v1n6ohi29t7.apps.googleusercontent.com"
    // expoClientId: "420870778500-bfs7guhtoe3a99jden68968i3iu7qe97.apps.googleusercontent.com"

  });



  useEffect(()=>{
async function GetLangLocal(){
  const selection = await AsyncStorage.getItem("selectedLang")
  if(selection){
    if(selection === "English"){
      setLang(Eng)
    }
    else if(selection === "Hindi"){
setLang(Hindi)
    }
    else if(selection === "Gujrati"){
setLang(Gujrati)
    }
    else{
setLang(Marathi)
    }
  }
}
GetLangLocal()

  },[focused])

  


  
  const handleLogin = () => {
    if (!Email) {
        setEmailError('Email is required');
      } else {
        setEmailError('');
      }
      if (!password) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
      }
      if(Email && password){
    setLoading(true)

        loginFirebase()
      }
      // Add your login logic here
    };

      React.useEffect(() => {
        if (response?.type === "success") {
          setAccessToken(response.authentication.accessToken);
          LoginGoogleFirebase(response.authentication.accessToken)
        }
      }, [response]);
  
    async function getUserData() {
      let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
  
      userInfoResponse.json().then(data => {
        setUserInfo(data);
        console.log(data)
      });
    }




async function loginWithApple(){
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    console.log(credential.identityToken)
    LoginFirebaseApple(credential.identityToken)
    // signed in
  } catch (e) {
    if (e.code === 'ERR_REQUEST_CANCELED') {
      // handle that the user canceled the sign-in flow
    } else {
      // handle other errors
    }
  }
}

function generateRawNonce(length) {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';
  let rawNonce = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    rawNonce += charset[randomIndex];
  }
  return rawNonce;
}

async function LoginFirebaseApple(token){
  const rawNonce = generateRawNonce(32); // Generate a raw nonce with a length of 32 characters

  try {
    const provider = new OAuthProvider('apple.com');
// const rawNonce = gen
    const credential = provider.credential({
      idToken:token,
      rawNonce: rawNonce, // Include the raw nonce
    });
    console.log("token",token,"credetianls",credential)

    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("identifier", "apple");

    // await AsyncStorage.setItem("password","null")
    NavigatorHandler()
    setLoading(false)

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    // Alert.alert("Error",errorMessage)
    // setLoading(false)

    // Handle errors here
  }
}



async function LoginGoogleFirebase(token){
console.log(token)
  try {
    const googleCredential = GoogleAuthProvider.credential(null, token);


    const userCredential = await signInWithCredential(auth, googleCredential);
    const user = userCredential.user;
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("identifier", "google");

    NavigatorHandler()
    setLoading(false)

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);

  }
}



    async function loginFirebase(){
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, Email, password);
        const user = userCredential.user;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        
        await AsyncStorage.setItem("password",password)
        NavigatorHandler()

        await AsyncStorage.setItem("identifier", "firebase");

        setLoading(false)

      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        Alert.alert("Error",errorMessage)
        setLoading(false)

        // Handle errors here
      }
    }


    function NavigatorHandler(){
      navigation.navigate("BottomNavigation");

      // Reset the navigation stack to only contain the BottomNavigation screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomNavigation' }],
      });
  
    }
  
  return (
    <View style={AuthStyles.container}>
      <ScrollView>

    {/* Logo or image */}
    <View style={AuthStyles.logoContainer}>
      {/* Your logo or image */}
      {/* <Text style={AuthStyles.logoText}>Your Logo</Text> */}
      <Image source={LogoImg} style={AuthStyles.ImgStyle}/>
    </View>
    
    {/* Email Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: EmailError && !Email? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="Email"
        placeholderTextColor="#808080"
        onChangeText={(text) => setEmail(text)}
      />  
    </View>
    <Text style={AuthStyles.errorText}>{!Email && EmailError}</Text>

    {/* Password Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: passwordError && !password ? 'red' : '#3C3737' }]}>
      <AntDesign name="lock" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="Password"
        placeholderTextColor="#808080"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
    </View>
   
    {
      loading === false ?
    <TouchableOpacity style={AuthStyles.button} onPress={()=> handleLogin()}>
      <AntDesign name="login" size={24} color="black" />
      <Text style={AuthStyles.buttonText}>{Lang.LoginTScreenxt.Button1Txt}</Text>
    </TouchableOpacity>
:
    <TouchableOpacity style={AuthStyles.button}>
      <AntDesign name="loading" size={24} color="black" />
      <Text style={AuthStyles.buttonText}>Loading....</Text>
    </TouchableOpacity>
    }

    <TouchableOpacity
     onPress={ () => { promptAsync({showInRecents: true}) }}
    style={[AuthStyles.button, { backgroundColor: Colors.SecondaryDark }]}>
      <AntDesign name="google" size={24} color="white" />
      <Text style={[AuthStyles.buttonText, { color: 'white' }]}>{Lang.LoginTScreenxt.Button2Txt}</Text>
    </TouchableOpacity>

    <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={AuthStyles.button}
        onPress={ () => loginWithApple()}
      />

    {/* Forgot Password and Sign Up */}
    <View style={AuthStyles.footer}>
      <Text                
      
      onPress={()=> navigation.navigate("ForgetPassword")}
style={AuthStyles.footerText}>{Lang.LoginTScreenxt.BottomTxt1}</Text>
      <Text 
              onPress={()=> navigation.navigate("SignUp")}

      style={AuthStyles.footerText}>{Lang.LoginTScreenxt.BottomTxt2}</Text>
    </View>
    </ScrollView>

  </View>
  );
};


export default LoginScreen;
