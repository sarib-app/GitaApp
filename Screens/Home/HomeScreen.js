import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HomeStyles from './HomeStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData } from '../../Global/Data/Data';
import { Eng, Gujrati,Hindi, Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookHindi } from '../../Global/Data/Book';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
const navigation =useNavigation()
  const [Lang,setLang]=useState(Eng)
  const [listData,setListData]=useState(BookHindi)

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

function onSearch(e){
  const searchText = e; // Example search text

  const filteredData = BookHindi.filter((chapter) => {
    // Check if the search text matches any content within verses
    const foundInVerses = chapter.verses.some((verse) => {
      const { original, translation } = verse.text;
      return (
        original.includes(searchText) ||
        // commentary.includes(searchText) ||
        translation.includes(searchText)
      );
    });
  
    // Check if the search text matches the chapter title or description
    const foundInChapterInfo = chapter.Title.includes(searchText) || chapter.Description.includes(searchText);
  
    return foundInVerses || foundInChapterInfo;
  });

  // console.log(filteredData)
  setListData(filteredData)
}



    function ChapterList({item}){
        return(
            <TouchableOpacity
            onPress={()=> navigation.navigate("RenderBook",{item})}
            
            style={HomeStyles.chapterContainer}>
            {/* Example of a chapter */}
            <View style={HomeStyles.ChapterSrialContainr}>
            <View style={[HomeStyles.ChapterSrialContainr,ContainerChapExt,{alignItems:'center',justifyContent:'center'}]}>
            <Text style={HomeStyles.serial}>{item.id}</Text>
    
                </View>
    
                </View>
            
              <View style={HomeStyles.chapterInfo}>
              <View style={[HomeStyles.chapterInfo,ContainerChapExt]}>
                <Text style={HomeStyles.chapterTitle}>{item.Title}</Text>
                <Text style={HomeStyles.chapterDescription}>{item.Description}</Text>
              </View>
              </View>
            {/* </View> */}
          </TouchableOpacity>
        )
    }
    

  
    return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>

      <Text style={HomeStyles.title}>{Lang.HomScreenTxt.Title}</Text>

      {/* Options */}
      <View style={HomeStyles.optionsContainer}>
        <View style={HomeStyles.option}>
          <Text style={HomeStyles.optionText}>{Lang.HomScreenTxt.TabTxt1}</Text>
        </View>
        <View style={HomeStyles.option}>
          <Text style={HomeStyles.optionText}>{Lang.HomScreenTxt.TabTxt2}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={HomeStyles.searchContainer}>
        <TextInput
          style={HomeStyles.searchInput}
          onChangeText={(e)=>onSearch(e)}
          placeholder={Lang.HomScreenTxt.searchTxt}
          placeholderTextColor="#808080"
        />
      </View>

      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <FlatList
      data={listData}
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


export default HomeScreen;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}