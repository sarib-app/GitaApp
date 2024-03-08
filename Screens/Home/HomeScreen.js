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

import BookGujrati from '../../Global/Data/BookGujarati';
import { BookEnglish } from '../../Global/Data/BookEnglish';
import { BookHindi } from '../../Global/Data/BookHindi';

import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
const navigation =useNavigation()
  const [Lang,setLang]=useState(Eng)
  const [listData,setListData]=useState(BookEnglish)
  const [bookData,setBookData]=useState(BookEnglish)

  const [favListData,setFavListData]=useState([])
  const [favListTemp,setFavListTemp]=useState([])

  const [selected,SetSelected]=useState("All")

const focused= useIsFocused()
  useEffect(()=>{
async function GetLangLocal(){
  const selection = await AsyncStorage.getItem("selectedLang")
  if(selection){
    if(selection === "English"){
      setLang(Eng)
      setBookData(BookEnglish)
    }
    else if(selection === "Hindi"){
setLang(Hindi)
setBookData(BookHindi)

    }
    else if(selection === "Gujrati"){
setLang(Gujrati)
setBookData(BookGujrati)

    }
    else{
setLang(Marathi)
setBookData(BookEnglish)

    }
  }
}
GetLangLocal()
GetFav()
  },[focused])


 async function GetFav(){
    const favorites = await AsyncStorage.getItem('favorites');
const ParsedFav = JSON.parse(favorites)
if(ParsedFav){
  setFavListData(ParsedFav)
  setFavListTemp(ParsedFav)
}
  }

 const data = selected === "All"? listData:favListData

function onSearch(e){
  const searchText = e; // Example search text
const datafortSearch = selected === "All"? bookData: favListTemp
  const filteredData = datafortSearch.filter((chapter) => {
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
    const foundInChapterInfo = chapter.Title.includes(searchText) 
    
    // || chapter.Description.includes(searchText);
  
    return foundInVerses || foundInChapterInfo;
  });

  // console.log(filteredData)
  setListData(selected === "All"?filteredData: listData)
  setFavListData(selected === "Fav"?filteredData: favListData)

}



    function ChapterList({item,index}){
        return(
          <>
            <TouchableOpacity
            onPress={()=> navigation.navigate("RenderBook",{item,selected})}
            
            style={[HomeStyles.chapterContainer]}>
            {/* Example of a chapter */}
            <View style={HomeStyles.ChapterSrialContainr}>
            <View style={[HomeStyles.ChapterSrialContainr,ContainerChapExt,{alignItems:'center',justifyContent:'center'}]}>
            <Text style={HomeStyles.serial}>{item.id}</Text>
    
                </View>
    
                </View>
            
              <View style={HomeStyles.chapterInfo}>
              <View style={[HomeStyles.chapterInfo,ContainerChapExt]}>
                <Text style={HomeStyles.chapterTitle}>Chapter {item.id}</Text>
                <Text style={HomeStyles.chapterDescription}>{item.Description}</Text>
              </View>
              </View>
            {/* </View> */}
          </TouchableOpacity>
          {
            index === data.length-1  && 
            <View style={{height:400}}>

            </View>
          }
          </>

        )
    }
    

  
    return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>

      <Text style={HomeStyles.title}>{Lang.HomScreenTxt.Title}</Text>

      {/* Options */}
      <View style={HomeStyles.optionsContainer}>
        <TouchableOpacity 
        onPress={()=>SetSelected("All")}
        style={[HomeStyles.option,{backgroundColor:selected === "All"?Colors.PrimaryColor:Colors.SecondaryDark}]}>
          <Text style={HomeStyles.optionText}>{Lang.HomScreenTxt.TabTxt1}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>SetSelected("Fav")}

        style={[HomeStyles.option,{backgroundColor:selected === "Fav"?Colors.PrimaryColor:Colors.SecondaryDark}]}>
          <Text style={HomeStyles.optionText}>{Lang.HomScreenTxt.TabTxt2}</Text>
        </TouchableOpacity>
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
      {/* <View style={{height:"65%"}}> */}


      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <FlatList
      data={data}
      renderItem={({item,index})=>{
        return(
            <ChapterList item={item} index={index} />
        )
      }
    }
      />
      {/* </View> */}

    </View>

    </View>
    );
     
   
  };


export default HomeScreen;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}