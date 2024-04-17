import React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,FlatList,Alert ,Platform} from 'react-native';
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
import { BookGujarati } from '../../Global/Data/BookGujarati';
import { BookEnglish } from '../../Global/Data/BookEnglish';
import { BookHindi } from '../../Global/Data/BookHindi';
import { Entypo } from '@expo/vector-icons';
import addToFavorites from './addToFav';
import removeFromFavorites from './RemoveFav';
import fetchFavorites from './fetchFav';
import { BannerAd, BannerAdSize, TestIds, } from 'react-native-google-mobile-ads';
import { getUserSubscriptionData } from '../../Components/GlobalCalls/GetUserTableData';
import { Ionicons } from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';
import GoBack from '../../Global/Styling/BackButton';
const bannerId = Platform.OS === "ios" ? "ca-app-pub-9024884895292195/3410170858":"ca-app-pub-9024884895292195/6048078531"
const adUnitId = __DEV__ ? TestIds.BANNER : bannerId;
// const adUnitId = TestIds.INTERSTITIAL ;

const RenderBook = ({route}) => {
    const { item } = route.params;
    
    const { selected } = route.params;
    const { searchTxt } = route.params;
    const [bookData,setBookData]=useState(BookEnglish)
    const [showAds,setShowAds]=useState(false)

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
        setBookData(BookGujarati)


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
    GetData()
    },[])
      
const Data = bookData.find((item) => item.id === id);
const filteredFavData = Data.verses.filter(verse => favs.includes(verse.verse_number));

async function GetData(){

  const userData = await AsyncStorage.getItem("user")
  const ParsedUser = JSON.parse(userData)
  fetchSubscriptionData(ParsedUser.uid)

 
 
}


const today = new Date()
const fetchSubscriptionData = async (userUid) => {
  try {
    const data = await getUserSubscriptionData(userUid);
    if (data) {
      // Convert Firestore Timestamps to JavaScript Dates
      const subscriptionDate = data.subscriptionDate ? new Date(data.subscriptionDate.seconds * 1000) : null;
      const expDate = data.ExpDate ? new Date(data.ExpDate.seconds * 1000) : null;

      // Create a new object that replaces the Firestore Timestamps with JavaScript Date objects
      const subscriptionDataWithDates = {
        ...data,
        subscriptionDate,
        ExpDate: expDate
      };


      if (expDate && expDate <= today) {
        setShowAds(true); // Set a state variable to indicate whether to show ads
      } else {
        setShowAds(false);
      }
     
      // setSubscriptionData(subscriptionDataWithDates);
    }else{
      setShowAds(true)
    }
  } catch (error) {
    setShowAds(true)

    // Handle any errors that occur during the fetch operation
    Alert.alert("Error","Could not fetch package details!")
  }
};

    
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


  function highlightSearchTerm(text) {
    if (!searchTxt) return text;
    
    const parts = text.split(new RegExp(`(${searchTxt})`, 'gi'));
    
    return (
      <>
        {parts.map((part, index) => (
          part.toLowerCase() === searchTxt.toLowerCase() ? (
            <Text key={index} style={{color:Colors.PrimaryColor}}>
              {part}
            </Text>
          ) : (
            <Text key={index} style={{color:Colors.lightTxtClr}}>
              {part}
            </Text>
          )
        ))}
      </>
    );
  }
  
        return(
            // <View style={HomeStyles.chapterContainer}>
         <>
              <View 
             
              style={{backgroundColor:Colors.SecondaryDark,padding:20,borderRadius:20,marginBottom:20}}>
              
              <TouchableOpacity onPress={()=> onAdd()} style={{alignSelf:'flex-end'}}>
                <Entypo  name="heart" size={24} color={added === true ? "red":"white"} />

              </TouchableOpacity>
                <Text style={{fontSize:20,color:Colors.lightTxtClr,fontWeight:'bold',marginBottom:10}}>
                    <Text style={{color:Colors.PrimaryColor}}>
                    Verse {item.verse_number}:  
                        </Text>
             
                    {highlightSearchTerm(" " + item.text.original)}
                </Text>
                <Text style={{fontSize:20,color:Colors.lightTxtClr,fontWeight:'bold',marginBottom:10}}>
                    <Text style={{color:Colors.PrimaryColor}}>
                    Translation:  
                        </Text>
                        {highlightSearchTerm(" " + item.text.translation)}
                </Text>
               
                {/* <Text style={{fontSize:20,color:Colors.lightTxtClr,fontWeight:'bold',marginBottom:10}}> 
                    <Text style={{color:Colors.PrimaryColor}}>
                    Commentary:  
                        </Text>
                     {" "+item.commentary}
                    {highlightSearchTerm(" " + item.commentary)}
                </Text> */}
      
              </View>
              {
showAds === true &&
<View style={{marginBottom:20}}>

              <BannerAd 
        unitId={adUnitId}
      
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
</View>

    }

      </>
      
        )
}

  return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>
     <GoBack/>
      <Text style={[HomeStyles.title,{marginBottom:5,fontSize:23}]}>Chapter {item.Title}</Text>

      <ScrollView>

      <Text style={[HomeStyles.title,{fontSize:17,color:Colors.PrimaryColor}]}>{item.Subtitle}</Text>

     
 
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
   
   </ScrollView>


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