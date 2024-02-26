import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import SubscribeStyle from './SubscribeStyles';
import { useNavigation } from '@react-navigation/native';
import { Eng, Gujrati,Hindi} from '../../Global/Data/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const SubscribeNow = () => {
const [SelectLang,setSelectLang] = useState("English")
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
  
const navigation = useNavigation()

  return (
    <View style={[GlobalStyles.container,{alignItems:'center'}]}>
      {/* Title */}

      <Text style={[HomeStyles.title,{marginTop:100,textAlign:'center',fontWeight:'bold'}]}>{Lang.SubscriptionScreenTxt.Title}{'\n'}John Smith</Text>

   
    
    <View style={SubscribeStyle.ContentContainer}>
        <Text style={[SubscribeStyle.SimpleTxt,{marginTop:0}]}>{Lang.SubscriptionScreenTxt.BoxTxt1}{"\n"}{Lang.SubscriptionScreenTxt.BoxTxt2}</Text>

{/* <Text style={[HomeStyles.title,{marginTop:20}]}>Welcome John Smith</Text> */}
<TouchableOpacity

style={SubscribeStyle.bigButton}>
<Text style={SubscribeStyle.BigbuttonText}>
    99₹ {Lang.SubscriptionScreenTxt.PriceTxt}
</Text>
</TouchableOpacity>

<Text style={SubscribeStyle.SimpleTxt}>{Lang.SubscriptionScreenTxt.BoxTxt3}</Text>
<Text style={SubscribeStyle.SimpleTxt}>{Lang.SubscriptionScreenTxt.BoxTxt2}</Text>
{/* <Text style={SubscribeStyle.SimpleTxt}>And More!</Text> */}


</View>
<TouchableOpacity
onPress={()=>navigation.navigate("PayNow")}
style={[SubscribeStyle.button]}>
<Text style={SubscribeStyle.buttonText}>
{Lang.SubscriptionScreenTxt.Button1Txt}
</Text>
</TouchableOpacity>
<TouchableOpacity

style={[SubscribeStyle.button,{backgroundColor:Colors.SecondaryDark}]}>
<Text style={SubscribeStyle.buttonText}>
{Lang.SubscriptionScreenTxt.Button2Txt}
</Text>
</TouchableOpacity>

    </View>
  );

};


export default SubscribeNow;
