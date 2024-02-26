import React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HomeStyles from '../Home/HomeStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, SettingOptions,SettingOptionsHindi,SettingOptionsGujrati,SettingOptionsMarathi } from '../../Global/Data/Data';
import { useNavigation } from '@react-navigation/native';
import AuthStyles from '../Auth/AuthStyles';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { BookHindi } from '../../Global/Data/Book';
const RenderBook = ({route}) => {
    const { item } = route.params;
    const id=item.id

  const [Lang,setLang]=useState(Eng)
  const [listData,setListData]=useState(SettingOptions)

  const focused= useIsFocused()
  useEffect(()=>{
async function GetLangLocal(){
  const selection = await AsyncStorage.getItem("selectedLang")
  if(selection){
    if(selection === "English"){
      setLang(Eng)
      setListData(SettingOptions)
    }
    else if(selection === "Hindi"){
setLang(Hindi)
setListData(SettingOptionsHindi)

    }
    else if(selection === "Gujrati"){
setLang(Gujrati)
setListData(SettingOptionsGujrati)

    }
    else{
setLang(Marathi)
setListData(SettingOptionsMarathi)

    }
  }
}
GetLangLocal()

  },[focused])
  
  const Data = BookHindi.find((item) => item.id === id);

//   console.log(Data.verses)
const navigation= useNavigation()
    function ChapterContent({item}){
        return(
            // <View style={HomeStyles.chapterContainer}>
         
              <View 
             
              style={{backgroundColor:Colors.SecondaryDark,padding:20,borderRadius:20,marginBottom:20}}>
                <Text style={{fontSize:20,color:Colors.lightTxtClr,fontWeight:'bold',marginBottom:10}}>
                    <Text style={{color:Colors.PrimaryColor}}>
                    Verse {item.verse_number}:  
                        </Text>
                    {" "+item.text.original}
                </Text>
                <Text style={{fontSize:20,color:Colors.lightTxtClr,fontWeight:'bold',marginBottom:10}}>
                    <Text style={{color:Colors.PrimaryColor}}>
                    Meaning:  
                        </Text>
                    {" "+item.text.translation}
                </Text>

                <Text style={{fontSize:20,color:Colors.lightTxtClr,fontWeight:'bold',marginBottom:10}}>
                    <Text style={{color:Colors.PrimaryColor}}>
                    Details:  
                        </Text>
                    {" "+item.commentary}
                </Text>
              </View>
      
        )
    }

  return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>

      <Text style={[HomeStyles.title,{marginBottom:5,fontSize:27}]}>Chapter {item.id}</Text>
      <Text style={[HomeStyles.title,{fontSize:17,color:Colors.PrimaryColor}]}>{item.chapter}</Text>


 
      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <FlatList
      data={Data.verses}
      renderItem={({item})=>{
        return(
            <ChapterContent item={item} />
        )
      }
    }
      />
   


    </View>

    </View>
  );
};


export default RenderBook;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}