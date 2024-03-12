import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
// import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import SubscribeStyle from './SubscribeStyles';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const PayNow = () => {
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
  
  return (
    <View style={[GlobalStyles.container,{alignItems:'center'}]}>
      {/* Title */}

      <Text style={[HomeStyles.title,{marginTop:100,textAlign:'center',fontWeight:'bold'}]}>{Lang.PayNowTxt.Tite}</Text>

   
    
    <View style={SubscribeStyle.ContentContainer}>
        <Text style={[SubscribeStyle.SimpleTxt,{marginTop:0}]}>{Lang.PayNowTxt.BoxTxt1}</Text>
<View style={SubscribeStyle.InputContainer}>
<TextInput
placeholder='Card Holder Name'
placeholderTextColor="white"
style={{flex:1,marginLeft:15,color:Colors.lightTxtClr}}
/>
</View>
<View style={SubscribeStyle.InputContainer}>
<TextInput
placeholder='Card  Number'
placeholderTextColor="white"
style={{flex:1,marginLeft:15,color:Colors.lightTxtClr}}
/>
</View>

<View style={SubscribeStyle.InputWrapper}>

<View style={[SubscribeStyle.InputContainerII]}>
<TextInput
placeholder='MM/YY'
placeholderTextColor="white"
style={{flex:1,marginLeft:15,color:Colors.lightTxtClr}}
/>
</View>
<View style={[SubscribeStyle.InputContainerII]}>


<TextInput
placeholder='CVV'
placeholderTextColor="white"
style={{flex:1,marginLeft:15,color:Colors.lightTxtClr}}
/>
</View>
</View>


<TouchableOpacity

style={[SubscribeStyle.PayButtono]}>
<Text style={SubscribeStyle.buttonText}>
{Lang.PayNowTxt.ButtonTxt}
</Text>
</TouchableOpacity>
<TouchableOpacity

style={[SubscribeStyle.PayButtono,{backgroundColor:Colors.lightTxtClr}]}>
<Text style={[SubscribeStyle.buttonText,{color:Colors.MainBgColor}]}>
  {Lang.PayNowTxt.Button2Txt}
</Text>
</TouchableOpacity>
</View>


    </View>
  );

};


export default PayNow;
