import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import LoginScreen from '../../Screens/Auth/Logins';
import SignUpScreen from '../../Screens/Auth/SignUp';
import { Colors } from '../../Global/Styling/Branding';
import HomeScreen from '../../Screens/Home/HomeScreen';
import Settings from '../../Screens/Settings/Settings';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
            style: { backgroundColor: Colors.SecondaryDark },
           
        
          
        }}
        screenOptions={{
            tabBarStyle: { backgroundColor:Colors.SecondaryDark,height:70,borderTopWidth:0 ,paddingBottom:-10},
            tabBarActiveBackgroundColor:Colors.PrimaryColor,
            tabBarShowLabel:false,
          }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="book" size={24} color={"white"} />
            ),
            headerShown:false,
          }}
          
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="setting" size={24} color={"white"} />
            ),
            headerShown:false

          }}
        />
      </Tab.Navigator>
  );
};

export default BottomNavigation;
