import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/Auth/Logins';
import SignUpScreen from './Screens/Auth/SignUp';
import BottomNavigation from './Components/BottomBar/BottomNavigation';
import AccountScreen from './Screens/Accounts/Accounts';
import SelectLanguage from './Screens/Language/SelectLanguage';
import SubscribeNow from './Screens/Subscription/SubscribeNow';
import PayNow from './Screens/Subscription/PayNow';
import UpdatePasswordScreen from './Screens/Auth/UpdatePassword';
import RenderBook from './Screens/BookRender/RenderBook';
import GoogleSignInButton from './Screens/Auth/GoogleLogin';
import TermsConditionsScreen from './Screens/AppContent/Terms&Conditions';
import PrivacyPolicyScreen from './Screens/AppContent/PrivacyPolicy';
import AboutUsScreen from './Screens/AppContent/AboutUs';
import { Text, View } from 'react-native';
import StripePaymentScreen from './Screens/Subscription/SampleStripe';
import PackageScreen from './Screens/PackageSubscription.js/PackageScreen';
import ForgetPassword from './Screens/Auth/ForgetPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './Global/Styling/Branding';
import CheckSettingScreen from './Screens/Settings/CheckSettingScreen';
// import 'expo-dev-client'
const Stack = createStackNavigator();

const App = () => {
const [initialRoute,setInitialRoute]=useState(null)





useEffect(()=>{

  GetAsyncData()
})
async function GetAsyncData(){
  const getUser = await AsyncStorage.getItem("user")
  const user= JSON.parse(getUser)

  const selection = await AsyncStorage.getItem("selectedLang")

  if(selection){
    setInitialRoute("BottomNavigation")
  }
  
  else {
    setInitialRoute("SelectLanguage")
  }
}


if(initialRoute === null){
  return(
    <CheckSettingScreen />
  )
}
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} options={{ headerShown: false }} />
        <Stack.Screen name="SubscribeNow" component={SubscribeNow} options={{ headerShown: false }} />
        <Stack.Screen name="PayNow" component={PayNow} options={{ headerShown: false }} />
        <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RenderBook" component={RenderBook} options={{ headerShown: false }} />
        <Stack.Screen name="GoogleSignInButton" component={GoogleSignInButton} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TermsConditionsScreen" component={TermsConditionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StripePaymentScreen" component={StripePaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PackageScreen" component={PackageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
