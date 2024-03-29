import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../Global/Styling/Branding';

function CheckSettingScreen(){
    return(
        <View style={{flex:1,backgroundColor:Colors.MainBgColor,justifyContent:"center",alignItems:"center"}}>
        <Text>Checking Configurations</Text>
       </View>
    )
}
export default CheckSettingScreen