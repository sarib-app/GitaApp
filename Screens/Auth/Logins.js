import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.png'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { auth } from '../../Components/Config/firebase'; // Adjust the path as needed
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// const auth = getAuth()
import { auth } from '../../config/firebase';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
const LoginScreen = () => {
const navigation = useNavigation()

const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const [Lang,setLang]=useState(Eng)


  const focused= useIsFocused()
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


    async function loginFirebase(){
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, Email, password);
        const user = userCredential.user;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("password",password)
        navigation.navigate("BottomNavigation");
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
  
  return (
    <View style={AuthStyles.container}>
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
    <Text style={AuthStyles.errorText}>{!password &&passwordError}</Text>

    {/* Login Button */}
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


    {/* Login with Gmail Button */}
    <TouchableOpacity

    style={[AuthStyles.button, { backgroundColor: Colors.SecondaryDark }]}>
      <AntDesign name="google" size={24} color="white" />
      <Text style={[AuthStyles.buttonText, { color: 'white' }]}>{Lang.LoginTScreenxt.Button2Txt}</Text>
    </TouchableOpacity>

    {/* Forgot Password and Sign Up */}
    <View style={AuthStyles.footer}>
      <Text style={AuthStyles.footerText}>{Lang.LoginTScreenxt.BottomTxt1}</Text>
      <Text 
              onPress={()=> navigation.navigate("SignUp")}

      style={AuthStyles.footerText}>{Lang.LoginTScreenxt.BottomTxt2}</Text>
    </View>
  </View>
  );
};


export default LoginScreen;
