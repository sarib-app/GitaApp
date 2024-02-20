import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HomeStyles from '../Home/HomeStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, SettingOptions } from '../../Global/Data/Data';
import { useNavigation } from '@react-navigation/native';
const Settings = () => {
const navigation= useNavigation()
    function ChapterList({item}){
        return(
            // <View style={HomeStyles.chapterContainer}>
         
              <TouchableOpacity 
              onPress={()=> navigation.navigate(item.routeTo)}
              style={HomeStyles.SettingsCards}>
              <View style={[HomeStyles.SettingsCards,ContainerChapExt]}>
                <Text style={{marginTop:20,marginLeft:20,color:'white'}}>{item.title}</Text>
                <Text style={HomeStyles.chapterDescription}>{item.Description}</Text>
              </View>
              </TouchableOpacity>
      
        )
    }

  return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>

      <Text style={HomeStyles.title}>Sttings</Text>

 
      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <FlatList
      data={SettingOptions}
      renderItem={({item})=>{
        return(
            <ChapterList item={item} />
        )
      }
    }
      />

    </View>

    </View>
  );
};


export default Settings;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}