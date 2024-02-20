import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import SubscribeStyle from './SubscribeStyles';
import { useNavigation } from '@react-navigation/native';
const SubscribeNow = () => {
const [SelectLang,setSelectLang] = useState("English")
const navigation = useNavigation()

  return (
    <View style={[GlobalStyles.container,{alignItems:'center'}]}>
      {/* Title */}

      <Text style={[HomeStyles.title,{marginTop:100,textAlign:'center',fontWeight:'bold'}]}>Welcome{'\n'}John Smith</Text>

   
    
    <View style={SubscribeStyle.ContentContainer}>
        <Text style={[SubscribeStyle.SimpleTxt,{marginTop:0}]}>Free trial for 3 days{"\n"}Give me all your money afterwards</Text>

{/* <Text style={[HomeStyles.title,{marginTop:20}]}>Welcome John Smith</Text> */}
<TouchableOpacity

style={SubscribeStyle.bigButton}>
<Text style={SubscribeStyle.BigbuttonText}>
    99₹ per month
</Text>
</TouchableOpacity>

<Text style={SubscribeStyle.SimpleTxt}>Read and listen to the Bhagavad Gita in high{"\n"}definition.</Text>
<Text style={SubscribeStyle.SimpleTxt}>Stay in touch with the current events with the{"\n"}calendar.</Text>
<Text style={SubscribeStyle.SimpleTxt}>And More!</Text>


</View>
<TouchableOpacity
onPress={()=>navigation.navigate("PayNow")}
style={[SubscribeStyle.button]}>
<Text style={SubscribeStyle.buttonText}>
    Subscribe Now
</Text>
</TouchableOpacity>
<TouchableOpacity

style={[SubscribeStyle.button,{backgroundColor:Colors.SecondaryDark}]}>
<Text style={SubscribeStyle.buttonText}>
    Continue With Free Trial
</Text>
</TouchableOpacity>

    </View>
  );

};


export default SubscribeNow;
