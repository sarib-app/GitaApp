import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity ,ActivityIndicator, Alert} from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
// import { FlatList } from 'react-native-gesture-handler';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import SubscribeStyle from './SubscribeStyles';
import { useNavigation } from '@react-navigation/native';
import { Eng, Gujrati,Hindi} from '../../Global/Data/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { createUserRecord } from '../../Components/GlobalCalls/PurchasePackage';
const SubscribeNow = ({route}) => {
  const { data } = route.params;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [user,setUser]=useState(null)

const Package = data === 99 ? "monthly":"annual"

const [SelectLang,setSelectLang] = useState("English")
const [Lang,setLang]=useState(Eng)
const focused= useIsFocused()
  useEffect(()=>{
async function GetLangLocal(){
  const selection = await AsyncStorage.getItem("selectedLang")
  const userData = await AsyncStorage.getItem("user")
  const ParsedUser = JSON.parse(userData)
  setUser(ParsedUser)
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
 

  const fetchPaymentIntentClientSecret = async () => {
    setLoading(true);
    
    // Replace with the actual values for your payment
    const paymentDetails = {
      amount: data*100, // amount in the smallest currency unit
      currency: 'usd',
      paymentMethodType: 'card' // or any other payment method type you are using
    };
    
    try {
      const response = await fetch('https://jiabxmgv39.us.aircode.run/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
      
      const { client_secret } = await response.json();
      setClientSecret(client_secret);
    } catch (e) {
      console.error(e);
      // Handle error or display a message to the user
    }

    setLoading(false);
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    
    // setLoading(true);

    const { error: initError } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Amore', 
    });

    if (initError) {
      console.error(initError);
      setLoading(false);
      return;
    }

    const { error: presentError } = await presentPaymentSheet({
      clientSecret: clientSecret,
    });

    if (presentError) {
      alert(`Error code: ${presentError.code}\n${presentError.message}`);
    } else {
      const purchasePackage = await createUserRecord(user.uid, Package)
      if(purchasePackage === "success"){
  Alert.alert("Success",'Package purchased successfull!');

}
else{
  Alert.alert("Error",'Payment is deducted but package coud not purchased, please contact us!');

}
    }

    setLoading(false);
  };

  useEffect(() => {
    if(data){

      fetchPaymentIntentClientSecret();
    }
  }, []);

const navigation = useNavigation()


function MainDesign(){
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
    {data}₹ {Lang.SubscriptionScreenTxt.PriceTxt}
</Text>
</TouchableOpacity>

<Text style={SubscribeStyle.SimpleTxt}>{Lang.SubscriptionScreenTxt.BoxTxt3}</Text>
<Text style={SubscribeStyle.SimpleTxt}>{Lang.SubscriptionScreenTxt.BoxTxt2}</Text>
{/* <Text style={SubscribeStyle.SimpleTxt}>And More!</Text> */}


</View>
<TouchableOpacity
onPress={()=>openPaymentSheet()}
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
}


  return (
    <StripeProvider publishableKey="pk_test_51NuBGvE9c1wXYOQO5qbYzDY0bxKYvT5647XaClqJH96aCgKEdwM1AP0UTfYDFOl0hwPP96W3Bi8UG1yL2LUyClKK00NjDLm6VO">
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
       <MainDesign/>
      )}
    </View>
  </StripeProvider>
  );

};


export default SubscribeNow;
