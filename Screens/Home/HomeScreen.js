import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,FlatList ,Alert, Platform} from 'react-native';
import HomeStyles from './HomeStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { Eng, Gujrati,Hindi, Marathi} from '../../Global/Data/Language';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookGujarati } from '../../Global/Data/BookGujarati';
import { BookEnglish } from '../../Global/Data/BookEnglish';
import { BookHindi } from '../../Global/Data/BookHindi';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserSubscriptionData } from '../../Components/GlobalCalls/GetUserTableData';

const HomeScreen = () => {
const navigation =useNavigation()
const [loaded, setLoaded] = useState(false);

  const [Lang,setLang]=useState(Eng)
  const [listData,setListData]=useState(BookEnglish)
  const [bookData,setBookData]=useState(BookEnglish)
  const [showAds,setShowAds]=useState(false)
  const [searchTxt,setSearcTxt] = useState("")

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
      setListData(BookEnglish)

      setBookData(BookEnglish)
    }
    else if(selection === "Hindi"){
setLang(Hindi)
setListData(BookHindi)
setBookData(BookHindi)

    }
    else if(selection === "Gujrati"){
setLang(Gujrati)
setBookData(BookGujarati)
setListData(BookGujarati)

    }
    else{
setLang(Marathi)
setBookData(BookEnglish)
setListData(BookEnglish)

    }
  }
}
GetLangLocal()
GetFav()
GetData()
  },[focused])

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
  
 async function GetFav(){
    const favorites = await AsyncStorage.getItem('favorites');
const ParsedFav = JSON.parse(favorites)
if(ParsedFav){
  setFavListData(ParsedFav)
  setFavListTemp(ParsedFav)
}
  }

  const data = selected === "All" ? listData : listData.filter(chapter => favListData.some(favChapter => favChapter.id === chapter.id));

 function onSearch(e) {
  setSearcTxt(e)
  const searchText = e.toLowerCase(); // Convert the search text to lower case
  const datafortSearch = selected === "All" ? bookData : favListTemp

  const filteredData = datafortSearch.filter((chapter) => {
    const foundInVerses = chapter.verses.some((verse) => {
      const { original, translation } = verse.text;
      return (
        original.toLowerCase().includes(searchText) ||
        translation.toLowerCase().includes(searchText)
      );
    });
  
    const foundInChapterInfo = chapter.Title.toLowerCase().includes(searchText); // Convert text being searched to lower case

    return foundInVerses || foundInChapterInfo;
  });

  setListData(selected === "All"?filteredData: listData)
  setFavListData(selected === "Fav"?filteredData: favListData)
}



function handleNaviagation(item){
//   if(showAds === true) {

//   if(item.id != 1){

//   if(loaded){
//     interstitial.show();
//     navigation.navigate("RenderBook",{item,selected})

//   }
//   else{

//     navigation.navigate("RenderBook",{item,selected})
//   }
// }
// else{

//   navigation.navigate("RenderBook",{item,selected})
// }
// }else{
//     navigation.navigate("RenderBook",{item,selected})

// }
navigation.navigate("RenderBook",{item,selected,searchTxt})
}


    function ChapterList({item,index}){
        return(
          <>
            <TouchableOpacity
            onPress={()=> {
              handleNaviagation(item)
            }}
            
            style={[HomeStyles.chapterContainer]}>
            {/* Example of a chapter */}
            <View style={HomeStyles.ChapterSrialContainr}>
            <View style={[HomeStyles.ChapterSrialContainr,ContainerChapExt,{alignItems:'center',justifyContent:'center'}]}>
            <Text style={HomeStyles.serial}>{item.id}</Text>
    
                </View>
    
                </View>
            
              <View style={HomeStyles.chapterInfo}>
              <View style={[HomeStyles.chapterInfo,ContainerChapExt]}>
                {/* <Text style={HomeStyles.chapterTitle}>Chapter {item.id}</Text> */}
                <Text style={HomeStyles.chapterTitle}>{item.Title}</Text>

                {/* <Text style={HomeStyles.chapterDescription}>{item.Title}</Text> */}
              </View>
              </View>
            {/* </View> */}
          </TouchableOpacity>
          {
            index === data.length-1  && 
            <View style={{height:200}}>

            </View>
          }
          </>

        )
    }
    


 






  
    return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>
<ScrollView>

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
      </ScrollView>

    </View>
   {/* { showAds === false &&
<View style={{bottom:40,position:'absolute',alignSelf:'center'}}>

              <BannerAd 
        unitId={TestIds.BANNER}
      
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
</View>

    } */}
    </View>
    );
     
   
  };


export default HomeScreen;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,justifyContent:'center'}