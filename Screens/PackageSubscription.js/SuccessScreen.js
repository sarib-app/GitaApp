import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image,Animated ,Modal} from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { AntDesign } from '@expo/vector-icons';
// import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import SubscribeStyle from './SubscribeStyles';
import { useNavigation } from '@react-navigation/native';
import { Eng, Gujrati,Hindi} from '../../Global/Data/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import sitingman from '../../assets/Imgs/sitingman.png'
const SuccessScreen = () => {
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
        setLang(Eng)
    }
  }
}
GetLangLocal()

  },[focused])
  
const navigation = useNavigation()

const bounceValue = new Animated.Value(1);

// Bouncing animation effect
const startBouncing = () => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 0.9,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]),
  ).start();
};

// Call the bouncing animation function
startBouncing();

function ScreenUi(){
    return(
        <View style={[GlobalStyles.container,{alignItems:'center'}]}>

        <Image 
        source={hands}
        style={{height:250,width:250,marginTop:100}}
        />
        <Text style={SubscribeStyle.Title}>Unlock all the features</Text>
        
             <View style={SubscribeStyle.CenterAligner}>
             <AntDesign name="checkcircle" size={24} color={Colors.PrimaryColor} />
             <Text style={SubscribeStyle.Txt}>Remove Advertisments</Text>
             </View>
             
             <View style={SubscribeStyle.CenterAligner}>
             <AntDesign name="checkcircle" size={24} color={Colors.PrimaryColor} />
             <Text style={SubscribeStyle.Txt}>Remove Advertisments</Text>
             </View>
             
             <View style={SubscribeStyle.CenterAligner}>
             <AntDesign name="checkcircle" size={24} color={Colors.PrimaryColor} />
             <Text style={SubscribeStyle.Txt}>Remove Advertisments</Text>
             </View>
             
             <View style={[SubscribeStyle.Buttons,{marginTop:20}]}>
            
             <Text style={[SubscribeStyle.Txt,{marginLeft:0}]}>₹900 Annual {"(₹75/month)"}</Text>
             <Text style={{color:"rgba(255,255,255,0.7)"}}>25% Off</Text>
        
             </View>
             <View style={SubscribeStyle.Buttons}>
            
            <Text style={[SubscribeStyle.Txt,{marginLeft:0}]}>₹99/Month </Text>
            <Text style={{color:"rgba(255,255,255,0.7)"}}>Cancel Anytime no commitment</Text>
        
            </View>
        
            </View>
    )
}


  return (
    <Modal
    visible={true}
    transparent={true}
    animationType='slide'
    
    >

    <View style={[GlobalStyles.container,{alignItems:'center'}]}>

<Image 
source={sitingman}
style={{height:250,width:250,marginTop:100}}
/>



   
     <TouchableOpacity 


     style={[SubscribeStyle.Buttons,{marginTop:20}]}>
    
     <Text style={[SubscribeStyle.Txt,{marginLeft:0,fontSize:40,color:"black", textAlign:"center"}]}>{Lang.SuccessScreen.Button1}</Text>
    

     </TouchableOpacity>
     <Animated.View style={[{alignItems:'center'}, { transform: [{ scale: bounceValue }] }]}>
     <TouchableOpacity 
      onPress={()=>navigation.navigate("BottomNavigation")}

     style={[SubscribeStyle.Buttons,{backgroundColor:"#FFD6A4"}]}>
    
    <Text style={[SubscribeStyle.Txt,{marginLeft:0,fontSize:25,color:"black", textAlign:"center"}]}>{Lang.SuccessScreen.Button2}</Text>


    </TouchableOpacity>
    </Animated.View>
    </View>
    </Modal>

  );

};


export default SuccessScreen;
