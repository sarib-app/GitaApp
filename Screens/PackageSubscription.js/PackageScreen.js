import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
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
import hands from '../../assets/Imgs/hands.png'
const PackageScreen = () => {
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
     
     <TouchableOpacity 
     onPress={()=>navigation.navigate("SubscribeNow",{ data: 900 })}

     style={[SubscribeStyle.Buttons,{marginTop:20}]}>
    
     <Text style={[SubscribeStyle.Txt,{marginLeft:0}]}>₹900 Annual {"(₹75/month)"}</Text>
     <Text style={{color:"rgba(255,255,255,0.7)"}}>25% Off</Text>

     </TouchableOpacity>
     <TouchableOpacity 
          onPress={()=>navigation.navigate("SubscribeNow",{ data: 99 })}

     style={SubscribeStyle.Buttons}>
    
    <Text style={[SubscribeStyle.Txt,{marginLeft:0}]}>₹99/Month </Text>
    <Text style={{color:"rgba(255,255,255,0.7)"}}>Cancel Anytime no commitment</Text>

    </TouchableOpacity>

    </View>
  );

};


export default PackageScreen;
