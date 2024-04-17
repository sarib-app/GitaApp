import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import styles from './Styles';
// import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { TermsEnglish,TermsGujarati,TermsHindi } from '../../Global/Data/AppContentTxt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBack from '../../Global/Styling/BackButton';

const TermsConditionsScreen = () => {







  const [Lang,setLang]=useState(TermsEnglish)


  const focused= useIsFocused()
    useEffect(()=>{
  async function GetLangLocal(){
    const selection = await AsyncStorage.getItem("selectedLang")
    if(selection){
      if(selection === "English"){
        setLang(TermsEnglish)
      }
      else if(selection === "Hindi"){
  setLang(TermsHindi)
      }
      else if(selection === "Gujrati"){
  setLang(TermsGujarati)
      }
      else{
  setLang(TermsEnglish)
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
           <ScrollView
        contentContainerStyle={{alignItems:'center'}}
        >


      <Text style={styles.heading}>Terms & Conditions</Text>
      <Text style={styles.content}>
      {Lang}
      </Text>
      </ScrollView>

    </View>
  );
};

export default TermsConditionsScreen;
