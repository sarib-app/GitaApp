import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import SubscribeStyle from './SubscribeStyles';
const PayNow = () => {
const [SelectLang,setSelectLang] = useState("English")


  return (
    <View style={[GlobalStyles.container,{alignItems:'center'}]}>
      {/* Title */}

      <Text style={[HomeStyles.title,{marginTop:100,textAlign:'center',fontWeight:'bold'}]}>Subscribe</Text>

   
    
    <View style={SubscribeStyle.ContentContainer}>
        <Text style={[SubscribeStyle.SimpleTxt,{marginTop:0}]}>Monthly MemberShip: 99</Text>
<View style={SubscribeStyle.InputContainer}>
<TextInput
placeholder='Card Holder Name'
placeholderTextColor="white"
style={{flex:1,marginLeft:15}}
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
    Pay Now
</Text>
</TouchableOpacity>
<TouchableOpacity

style={[SubscribeStyle.PayButtono,{backgroundColor:Colors.lightTxtClr}]}>
<Text style={[SubscribeStyle.buttonText,{color:Colors.MainBgColor}]}>
    Cancel
</Text>
</TouchableOpacity>
</View>


    </View>
  );

};


export default PayNow;
