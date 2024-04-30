import React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import HomeStyles from '../Home/HomeStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
// import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, SettingOptions,SettingOptionsHindi,SettingOptionsGujrati,SettingOptionsMarathi } from '../../Global/Data/Data';
import { useNavigation } from '@react-navigation/native';
import AuthStyles from '../Auth/AuthStyles';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { ScrollView } from 'react-native-gesture-handler';
const Settings = () => {
  const [Lang,setLang]=useState(Eng)
  const [listData,setListData]=useState(SettingOptions)
  const [param,setparamm]=useState("en")
  const [user,setUser]=useState(null)


  const focused= useIsFocused()
  useEffect(()=>{
  async function GetLangLocal(){
   
  const selection = await AsyncStorage.getItem("selectedLang")

  if(selection){
    if(selection === "English"){
      setLang(Eng)
      setparamm("en")
      setListData(SettingOptions)
    }
    else if(selection === "Hindi"){
      setparamm("hi")

   setLang(Hindi)
   setListData(SettingOptionsHindi)

    }
    else if(selection === "Gujrati"){
      setparamm("gu")

setLang(Gujrati)
setListData(SettingOptionsGujrati)

    }
    else{
      setparamm("en")

setLang(Marathi)
setListData(SettingOptionsMarathi)

    }
  }
}
GetLangLocal()
checkLoginUser()

  },[focused])
  async function checkLoginUser(){
    const getUser = await AsyncStorage.getItem("user")
    const user= JSON.parse(getUser)
    if(user){
      setUser(user)
    }
  }

  function ContactLinker(){
  Linking.openURL(`https://bhagavadgita-app.com/${param}/contactus/`);

  }
  function PrivacyLinker(){
    Linking.openURL(`https://bhagavadgita-app.com/${param}/privacypolicy/`);
  
    }
    function checkLogin(){
if(user!==null){
  navigation.navigate("AccountScreen")
}
else{
  navigation.navigate("Login")
}
    }
  

const navigation= useNavigation()
    function ChapterList({item}){
        return(
            // <View style={HomeStyles.chapterContainer}>
         
              <TouchableOpacity 
              onPress={()=> {
                if(item.routeTo == "contactUs"){

                  // navigation.navigate(item.routeTo)
                  ContactLinker()
                }
                else if(item.routeTo == "PrivacyPolicyScreen"){
                  PrivacyLinker()
                }
                else if(item.routeTo == "AccountScreen"){
                  checkLogin()
                }
                else{
                  // ContactLinker()
                  navigation.navigate(item.routeTo)

                }
                
                }
                }
              style={HomeStyles.SettingsCards}>
              <View style={[HomeStyles.SettingsCards,ContainerChapExt]}>
                <Text style={{marginTop:20,marginLeft:20,color:'white'}}>{item.title}</Text>
                <Text style={HomeStyles.chapterDescription}>{item.Description}</Text>
              </View>
              </TouchableOpacity>
      
        )
    }

  return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>
      <Text style={HomeStyles.title}>Settings</Text>
<ScrollView nestedScrollEnabled={true} contentContainerStyle={{alignItems:'center'}}>


 
      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <FlatList
      data={listData}
      renderItem={({item})=>{
        return(
            <ChapterList item={item} />
        )
        }
        }
      />
      {
        user != null &&
      <TouchableOpacity
onPress={()=>{
  AsyncStorage.clear()
  setUser(null)

}}
style={[AuthStyles.button,{marginTop:20}]}>
<Text style={AuthStyles.buttonText}>
    {Lang.SettingScreenTxt.Button1Txt}
</Text>
</TouchableOpacity>
      }


</ScrollView>

    </View>

    </View>
  );
};


export default Settings;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}