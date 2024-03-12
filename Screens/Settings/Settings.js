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
const Settings = () => {
  const [Lang,setLang]=useState(Eng)
  const [listData,setListData]=useState(SettingOptions)

  const focused= useIsFocused()
  useEffect(()=>{
  async function GetLangLocal(){
  const selection = await AsyncStorage.getItem("selectedLang")
  if(selection){
    if(selection === "English"){
      setLang(Eng)
      setListData(SettingOptions)
    }
    else if(selection === "Hindi"){
   setLang(Hindi)
   setListData(SettingOptionsHindi)

    }
    else if(selection === "Gujrati"){
setLang(Gujrati)
setListData(SettingOptionsGujrati)

    }
    else{
setLang(Marathi)
setListData(SettingOptionsMarathi)

    }
  }
}
GetLangLocal()

  },[focused])

  function ContactLinker(){
    Linking.openURL('https://bhagavadgita-app.com/contactus');

  }
  

const navigation= useNavigation()
    function ChapterList({item}){
        return(
            // <View style={HomeStyles.chapterContainer}>
         
              <TouchableOpacity 
              onPress={()=> {
                if(item.routeTo != "contactUs"){

                  navigation.navigate(item.routeTo)
                }
                else{
                  ContactLinker()
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
      <TouchableOpacity
onPress={()=>navigation.navigate("Login")}
style={[AuthStyles.button,{marginTop:20}]}>
<Text style={AuthStyles.buttonText}>
    {Lang.SettingScreenTxt.Button1Txt}
</Text>
</TouchableOpacity>

    </View>

    </View>
  );
};


export default Settings;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}