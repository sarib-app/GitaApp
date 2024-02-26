import React from 'react';
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
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectLanguage">
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} options={{ headerShown: false }} />
        <Stack.Screen name="SubscribeNow" component={SubscribeNow} options={{ headerShown: false }} />
        <Stack.Screen name="PayNow" component={PayNow} options={{ headerShown: false }} />
        <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RenderBook" component={RenderBook} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
