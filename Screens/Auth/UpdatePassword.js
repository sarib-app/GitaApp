import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, AuthStylesheet,Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import AuthStyles from './AuthStyles';
import { Colors } from '../../Global/Styling/Branding';
import LogoImg from '../../assets/Imgs/LogoImg.png'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updatePasswordd from '../../Components/GlobalCalls/UpdatePasswordCall';

const UpdatePasswordScreen = () => {
const navigation = useNavigation()

  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleUpdate =async () => {
    if (!password) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
      }
    if (!ConfirmPassword) {
        setConfirmPasswordError('ConfirmPassword is required');
      } else {
        setConfirmPasswordError('');
      }
   
      if(ConfirmPassword && password){
      setLoading(true)
 await  updatePasswordd(password,ConfirmPassword)
   setLoading(false)

      }
      // Add your login logic here
    };


  return (
    <View style={AuthStyles.container}>
    {/* Logo or image */}
   


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

    {/* ConfirmPassword Field */}
    <View style={[AuthStyles.inputContainer, { borderColor: ConfirmPasswordError && !ConfirmPassword? 'red' : '#3C3737' }]}>
      <AntDesign name="user" size={24} color="white" />
      <TextInput
        style={AuthStyles.input}
        placeholder="ConfirmPassword"
        placeholderTextColor="#808080"
        onChangeText={(text) => setConfirmPassword(text)}
      />
    </View>
    <Text style={AuthStyles.errorText}>{ConfirmPasswordError}</Text>


    {/* Login Button */}

    {
        loading === false ?

    <TouchableOpacity style={AuthStyles.button} onPress={()=> handleUpdate()}>
      <AntDesign name="lock" size={24} color="black" />
      <Text style={AuthStyles.buttonText}>Update Password</Text>
    </TouchableOpacity>
    :
  <TouchableOpacity style={AuthStyles.button} >
  {/* <AntDesign name="lock" size={24} color="black" /> */}
  <Text style={AuthStyles.buttonText}>Loading....</Text>
</TouchableOpacity>
}


  </View>
  );
};


export default UpdatePasswordScreen;
