import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.png'
import { useNavigation } from '@react-navigation/native';
const SignUpScreen = () => {
const navigation = useNavigation()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLogin = () => {
    if (!username) {
        setUsernameError('Username is required');
      } else {
        setUsernameError('');
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

      // Add your login logic here
    };
  
  return (
    <View style={AuthStyles.container}>
    {/* Logo or image */}
    <View style={AuthStyles.logoContainer}>
      {/* Your logo or image */}
      {/* <Text style={AuthStyles.logoText}>Your Logo</Text> */}
      <Image source={LogoImg} style={{width:150,height:150}}/>
    </View>
    
    {/* Username Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: usernameError && !username? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="Username"
        placeholderTextColor="#808080"
        onChangeText={(text) => setUsername(text)}
      />
    </View>
    <Text style={AuthStyles.errorText}>{!username && usernameError}</Text>

    {/* Password Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: emailError && !email ? 'red' : '#3C3737' }]}>
      <AntDesign name="lock" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="Email"
        placeholderTextColor="#808080"
        secureTextEntry
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
    <TouchableOpacity style={AuthStyles.button} onPress={handleLogin}>
      {/* <AntDesign name="login" size={24} color="black" /> */}
      <Text style={AuthStyles.buttonText}>Sign Up</Text>
    </TouchableOpacity>

    {/* Login with Gmail Button */}
    <TouchableOpacity 
    onPress={()=> navigation.navigate("Login")}
    style={[AuthStyles.button, { backgroundColor: Colors.SecondaryDark }]}>
      {/* <AntDesign name="google" size={24} color="white" /> */}
      <Text style={[AuthStyles.buttonText, { color: 'white' }]}>Back</Text>
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
