import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import styles from './Styles';
// import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { PrivacyEnglish,PrivacyGujarati,PrivacyHindi } from '../../Global/Data/AppContentTxt';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PrivacyPolicyScreen = () => {



  const [Lang,setLang]=useState(PrivacyEnglish)


  const focused= useIsFocused()
    useEffect(()=>{
  async function GetLangLocal(){
    const selection = await AsyncStorage.getItem("selectedLang")
    if(selection){
      if(selection === "English"){
        setLang(PrivacyEnglish)
      }
      else if(selection === "Hindi"){
  setLang(PrivacyHindi)
      }
      else if(selection === "Gujrati"){
  setLang(PrivacyGujarati)
      }
      else{
  setLang(PrivacyEnglish)
      }
    }
  }
  GetLangLocal()
  
    },[focused])

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
        <ScrollView
        contentContainerStyle={{alignItems:'center'}}
        >

      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.content}>
      {Lang}
      </Text>
      </ScrollView>

    </View>
  );
};

export default PrivacyPolicyScreen;
