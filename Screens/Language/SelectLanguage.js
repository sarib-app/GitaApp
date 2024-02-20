import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, Languages } from '../../Global/Data/Data';
import HomeStyles from '../Home/HomeStyles';
import Language from './Language';
const SelectLanguage = () => {
const [SelectLang,setSelectLang] = useState("English")
function LanguageList({item}){
    return(
<TouchableOpacity
onPress={()=> setSelectLang(item.title)}

style={[Language.button,{backgroundColor:item.title === SelectLang ? Colors.lightTxtClr:Colors.PrimaryColor}]}>
<Text style={Language.buttonText}>
    {item.title}
</Text>
</TouchableOpacity>
    )
}

  return (
    <View style={[GlobalStyles.container,{alignItems:'center'}]}>
      {/* Title */}
    <View style={HomeStyles.container}>

      <Text style={[HomeStyles.title,{marginTop:20}]}>Select Language</Text>

    </View>
    
    <FlatList
    data={Languages}
    renderItem={({item})=>{
        return(
            <LanguageList item={item}/>
        )
    }}
    />


    </View>
  );

};


export default SelectLanguage;
