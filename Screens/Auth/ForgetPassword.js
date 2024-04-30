import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.png'
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
import { handleForgotPassword } from '../../Components/GlobalCalls/handleForgetPassword';
import GoBack from '../../Global/Styling/BackButton';
const ForgetPassword = () => {
const navigation = useNavigation()


const [email, setEmail] = useState('');


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
  

    
  return (
    <View style={AuthStyles.container}>
       {/* <View
      style={{alignSelf:'flex-start',marginLeft:20}}
      >

      <GoBack/>
      </View> */}
    {/* Logo or image */}
    <View style={AuthStyles.logoContainer}>
      {/* Your logo or image */}
      {/* <Text style={AuthStyles.logoText}>Your Logo</Text> */}
      <Image source={LogoImg} style={{width:150,height:150}}/>
    </View>
    
 

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

   

 

    {loading === false ?
     <TouchableOpacity style={AuthStyles.button}  onPress={()=> email && handleForgotPassword(email)}>
     {/* <AntDesign name="login" size={24} color="black" /> */}
     <Text style={AuthStyles.buttonText}>Forget Password</Text>
   </TouchableOpacity>
   :
   <TouchableOpacity style={AuthStyles.button} >
   {/* <AntDesign name="login" size={24} color="black" /> */}
   <Text style={AuthStyles.buttonText}>Loading...</Text>
 </TouchableOpacity>
    }
   

   
    <TouchableOpacity 
    onPress={()=> navigation.navigate("Login")}
    style={[AuthStyles.button, { backgroundColor: Colors.SecondaryDark }]}>
      {/* <AntDesign name="google" size={24} color="white" /> */}
      <Text style={[AuthStyles.buttonText, { color: 'white' }]}>{Lang.RegisterScreenTxt.Button2Txt}</Text>
    </TouchableOpacity>

  
  </View>
  );
};


export default ForgetPassword;
