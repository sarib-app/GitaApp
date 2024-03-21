import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AccountStyle from './AccountStyls';
import checkLogin from '../Auth/checkLogin';
import GetAsyncData from '../../Components/GlobalCalls/GetAsyncData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import updateEmaill from '../../Components/GlobalCalls/UpdateEmail';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
import { getUserSubscriptionData } from '../../Components/GlobalCalls/GetUserTableData';


const AccountScreen = () => {
const navigation = useNavigation()
const [user,setUser]=useState(null)
const [subscriptionData,setSubscriptionData]=useState(null)

const [email,setEmail]=useState()
const [oldPassword,setOldPassword]=useState(0)
const [Lang,setLang]=useState(Eng)
const [identifier,setidentifier]=useState("")


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
  

useEffect(()=>{


  GetData()
},[focused])

  
async function GetData(){

  const getPassword = await AsyncStorage.getItem("password")
  const identifier = await AsyncStorage.getItem("identifier")
  setidentifier(identifier)
    const userData = await AsyncStorage.getItem("user")
  const ParsedUser = JSON.parse(userData)
  setUser(ParsedUser)
  fetchSubscriptionData(ParsedUser.uid)
console.log(ParsedUser)
  setOldPassword(getPassword)
 
}


const fetchSubscriptionData = async (userUid) => {
  try {
    const data = await getUserSubscriptionData(userUid);
    if (data) {
      // Convert Firestore Timestamps to JavaScript Dates
      const subscriptionDate = data.subscriptionDate ? new Date(data.subscriptionDate.seconds * 1000) : null;
      const expDate = data.ExpDate ? new Date(data.ExpDate.seconds * 1000) : null;

      // Create a new object that replaces the Firestore Timestamps with JavaScript Date objects
      const subscriptionDataWithDates = {
        ...data,
        subscriptionDate,
        ExpDate: expDate
      };
console.log(subscriptionDataWithDates)
      setSubscriptionData(subscriptionDataWithDates);
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    Alert.alert("Error","Could not fetch package details!")
  }
};

  return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={AccountStyle.container}>

      <Text style={AccountStyle.title}>Accounts</Text>
      <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{Lang.AccountScreenTxt.SubscriptionTitle}</Text>

<TouchableOpacity 
       onPress={()=> navigation.navigate("PackageScreen")}
       style={AccountStyle.chapterInfo}>
       {
        subscriptionData?
   <>
        <Text style={AccountStyle.chapterTitle}>{subscriptionData?.pacakgeTaken}</Text>
        <Text style={AccountStyle.chapterDescription}>{Lang.AccountScreenTxt.SusbcriptionTxt3 + ":" + subscriptionData?.ExpDate}</Text>
</>
:<>
         <Text style={AccountStyle.chapterTitle}>{Lang.AccountScreenTxt.SusbcriptionTxt1}</Text>
       <Text style={AccountStyle.chapterDescription}>{Lang.AccountScreenTxt.SusbcriptionTxt3}</Text>
       </>

      }
    
     </TouchableOpacity>
     
  

  

      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{Lang.AccountScreenTxt.nameTitle}</Text>

      <View style={AccountStyle.chapterInfo}>
             
             <Text style={AccountStyle.chapterTitle}>{user?.displayName}</Text>
             <Text style={AccountStyle.chapterDescription}>{"Update Account name"}</Text>
          
           </View>


           <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{Lang.AccountScreenTxt.EmailTitle}</Text>

<View style={AccountStyle.chapterInfo}>
       
       <TextInput 
       onChangeText={(e)=> setEmail(e)}
       onEndEditing={()=>{ oldPassword != "null" &&
        updateEmaill(email,oldPassword)
       }}
       style={AccountStyle.chapterTitle}>{user?.email}</TextInput>
       <Text style={AccountStyle.chapterDescription}>{"Update Account Email"}</Text>
    
     </View>




{
  identifier === "firebase" &&

  <>
     <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{Lang.AccountScreenTxt.PasswordTitle}</Text>
  
  <TouchableOpacity
onPress={()=> navigation.navigate("UpdatePasswordScreen")}
style={[AccountStyle.chapterInfo,{height:50}]}>
       
       <Text style={AccountStyle.chapterTitle}>{"Reset Password"}</Text>
    
     </TouchableOpacity>
  </>

}


     <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{Lang.AccountScreenTxt.PaymentTitle}</Text>

<View style={AccountStyle.chapterInfo}>
       
       <Text style={AccountStyle.chapterTitle}>{Lang.AccountScreenTxt.PaymentTxt1} 1235</Text>
       <Text style={AccountStyle.chapterDescription}>{Lang.AccountScreenTxt.PaymentTxt2}</Text>
    
     </View>



    </View>

    </View>
  );
};


export default AccountScreen;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}