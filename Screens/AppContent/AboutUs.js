import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './Styles';
import { useIsFocused } from '@react-navigation/native';
import { AboutEnglish,AboutGujarati,AboutHindi,AboutMarathi } from '../../Global/Data/AppContentTxt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBack from '../../Global/Styling/BackButton';
const AboutUsScreen = () => {


    const [SelectLang,setSelectLang] = useState("English")

const [Lang,setLang]=useState(AboutEnglish)


const focused= useIsFocused()
  useEffect(()=>{
async function GetLangLocal(){
  const selection = await AsyncStorage.getItem("selectedLang")
  if(selection){
    if(selection === "English"){
      setLang(AboutEnglish)
    }
    else if(selection === "Hindi"){
setLang(AboutHindi)
    }
    else if(selection === "Gujrati"){
setLang(AboutGujarati)
    }
    else{
setLang(AboutMarathi)
    }
  }
}
GetLangLocal()

  },[focused])
  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
       <View
      style={{alignSelf:'flex-start',marginLeft:20,marginTop:50}}
      >

      <GoBack/>
      </View>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.content}>
       {Lang}
      </Text>
    </View>
  );
};

export default AboutUsScreen;
