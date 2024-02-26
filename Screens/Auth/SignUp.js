import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.png'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
const SignUpScreen = () => {
const navigation = useNavigation()

const [displayName, setdisplayName] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');

  const [displayNameError, setdisplayNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
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
    if (!displayName) {
        setdisplayNameError('displayName is required');
      } else {
        setdisplayNameError('');
      }
      if (!password) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
      }
      if (!email) {
        setEmailError('Email is required');
      } else {
        setEmailError('');
      }
      if(email,password,displayName){
        SignItUp()
      }

      // Add your login logic here
    };

    async function SignItUp() {
      setLoading(true);
    
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, displayName);
        const user = userCredential.user;
        console.log(user.uid);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("password", password);
        navigation.navigate("BottomNavigation");
        setLoading(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Alert.alert("Error", errorMessage);
        setLoading(false);
      }
    }
    
  return (
    <View style={AuthStyles.container}>
    {/* Logo or image */}
    <View style={AuthStyles.logoContainer}>
      {/* Your logo or image */}
      {/* <Text style={AuthStyles.logoText}>Your Logo</Text> */}
      <Image source={LogoImg} style={{width:150,height:150}}/>
    </View>
    
    {/* displayName Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: displayNameError && !displayName? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="displayName"
        placeholderTextColor="#808080"
        onChangeText={(text) => setdisplayName(text)}
      />
    </View>
    <Text style={AuthStyles.errorText}>{!displayName && displayNameError}</Text>

    {/* Password Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: emailError && !email ? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="Email" 
        placeholderTextColor="#808080"
        // secureTextEntry
        onChangeText={(text) => setEmail(text)}
      />
    </View>
    <Text style={AuthStyles.errorText}>{!email &&emailError}</Text>

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

    {loading === false ?
     <TouchableOpacity style={AuthStyles.button} onPress={handleLogin}>
     {/* <AntDesign name="login" size={24} color="black" /> */}
     <Text style={AuthStyles.buttonText}>{Lang.RegisterScreenTxt.Button1Txt}</Text>
   </TouchableOpacity>
   :
   <TouchableOpacity style={AuthStyles.button} >
   {/* <AntDesign name="login" size={24} color="black" /> */}
   <Text style={AuthStyles.buttonText}>Loading...</Text>
 </TouchableOpacity>
    }
   

    {/* Login with Gmail Button */}
    <TouchableOpacity 
    onPress={()=> navigation.navigate("Login")}
    style={[AuthStyles.button, { backgroundColor: Colors.SecondaryDark }]}>
      {/* <AntDesign name="google" size={24} color="white" /> */}
      <Text style={[AuthStyles.buttonText, { color: 'white' }]}>{Lang.RegisterScreenTxt.Button2Txt}</Text>
    </TouchableOpacity>

    {/* Forgot Password and Sign Up */}
    {/* <View style={AuthStyles.footer}>
      <Text style={AuthStyles.footerText}>Forgot your password? Reset Password</Text>
      <Text style={AuthStyles.footerText}>Don't have an account? Sign Up</Text>
    </View> */}
  </View>
  );
};


export default SignUpScreen;
