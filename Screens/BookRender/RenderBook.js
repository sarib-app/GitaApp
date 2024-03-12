import React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import HomeStyles from '../Home/HomeStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
// import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData, SettingOptions,SettingOptionsHindi,SettingOptionsGujrati,SettingOptionsMarathi } from '../../Global/Data/Data';
import { useNavigation } from '@react-navigation/native';
import AuthStyles from '../Auth/AuthStyles';
import { Eng, Gujrati,Hindi,Marathi} from '../../Global/Data/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
// import { BookHindi } from '../../Global/Data/Book';
import BookGujrati from '../../Global/Data/BookGujarati';
import { BookEnglish } from '../../Global/Data/BookEnglish';
import { BookHindi } from '../../Global/Data/BookHindi';
import { Entypo } from '@expo/vector-icons';
import addToFavorites from './addToFav';
import removeFromFavorites from './RemoveFav';
import fetchFavorites from './fetchFav';
const RenderBook = ({route}) => {
    const { item } = route.params;
    const { selected } = route.params;
    const [bookData,setBookData]=useState(BookEnglish)

    const id=item.id
    const Title = item.Title
    const focused= useIsFocused()
    const navigation= useNavigation()
    const [favs,setFavs]=useState([])
    useEffect(()=>{
  async function GetLangLocal(){
    const selection = await AsyncStorage.getItem("selectedLang")
    if(selection){
      if(selection === "English"){
        setBookData(BookEnglish)
      }
      else if(selection === "Hindi"){
        setBookData(BookHindi)


      }
      else if(selection === "Gujrati"){
        setBookData(BookGujrati)


      }
      else{

        setBookData(BookEnglish)


      }
    }
  }
  GetLangLocal()

    },[focused])
 
    useEffect(()=>{
    const fetchFavCall = async ()=>{

      const favResult = await  fetchFavorites(id)
      console.log(favResult)
      setFavs(favResult)
    }
    fetchFavCall()
    },[])
      
const Data = bookData.find((item) => item.id === id);
const filteredFavData = Data.verses.filter(verse => favs.includes(verse.verse_number));

    
function ChapterContent({item}){

  const [added,setAdded]=useState(favs.includes(item.verse_number)?true:false)
  async function onAdd(){
    if(added === false){
      const result = await addToFavorites(id,Title,item)
      if(result === "success"){
        setAdded(true)
      }
    }
    else{
      const result = await removeFromFavorites(id,item.verse_number)
      if(result === "success"){
        setAdded(false)
      }
    }
  
  }
  
        return(
            // <View style={HomeStyles.chapterContainer}>
         
              <View 
             
              style={{backgroundColor:Colors.SecondaryDark,padding:20,borderRadius:20,marginBottom:20}}>
              
              <TouchableOpacity onPress={()=> onAdd()} style={{alignSelf:'flex-end'}}>
                <Entypo  name="heart" size={24} color={added === true ? "red":"white"} />

              </TouchableOpacity>
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
      data={selected === "All"?Data.verses:filteredFavData}
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
const ContainerChapExt 
={ 
  backgroundColor:Colors.SecondaryDark,
  marginTop:-2,
  marginLeft:-2,   
  justifyContents:'center'
}