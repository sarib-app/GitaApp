import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity ,FlatList} from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
// import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import Language from './Language';
import checkLogin from '../Auth/checkLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
const SelectLanguage = () => {
  const navigation = useNavigation()
const [SelectLang,setSelectLang] = useState("English") 

const [Lang,setLang]=useState(Eng)
const focused= useIsFocused()
  useEffect(()=>{
  async function GetLangLocal(){
  const selection = await AsyncStorage.getItem("selectedLang")
  if(selection){
    setSelectLang(selection)
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
  },[focused,SelectLang])
async function SetTheLanguage(){

   await AsyncStorage.setItem("selectedLang",SelectLang)
    const getUser = await AsyncStorage.getItem("user")
    const user= JSON.parse(getUser)
    if (user) {
    navigation.navigate('BottomNavigation')
    console.log("user",user)
    } else {
    navigation.navigate('Login')
    // console.log("unot ser","getUser")

    }
    // onAuthStateChanged(auth, (user) => {
    // });

}

async function onLangSeclection (lang){
  setSelectLang(lang)
  await AsyncStorage.setItem("selectedLang",lang)

}

function LanguageList({item}){
    return(
<TouchableOpacity
onPress={()=> onLangSeclection(item.title)}

style={[Language.button,{backgroundColor:item.title === SelectLang ? Colors.lightTxtClr:Colors.PrimaryColor}]}>
<Text style={Language.buttonText}>
    {item.title}
</Text>
</TouchableOpacity>
    )
}

  return (
    <View style={[GlobalStyles.container,{alignItems:'center'}]}>
      {/* Title */}
    <View style={HomeStyles.container}>

      <Text style={[HomeStyles.title,{marginTop:20}]}>{Lang.LanguageScreenTxt.Title}</Text>

    </View>
    <View style={{height:'50%'}}>

    <FlatList
    data={Languages}
    renderItem={({item})=>{
        return(
            <LanguageList item={item}/>
        )
    }}
    />
    </View>

<TouchableOpacity
onPress={()=> SetTheLanguage()}

style={[Language.button,{position:'absolute',bottom:100}]}>
<Text style={Language.buttonText}>
    {Lang.LanguageScreenTxt.BtnText}
</Text>
</TouchableOpacity>

    </View>
  );

};


export default SelectLanguage;
