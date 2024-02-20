import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import HomeStyles from './HomeStyles';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData } from '../../Global/Data/Data';
const HomeScreen = () => {
    
    
    function ChapterList({item}){
        return(
            <View style={HomeStyles.chapterContainer}>
            {/* Example of a chapter */}
            <View style={HomeStyles.ChapterSrialContainr}>
            <View style={[HomeStyles.ChapterSrialContainr,ContainerChapExt,{alignItems:'center',justifyContent:'center'}]}>
            <Text style={HomeStyles.serial}>{item.Id}</Text>
    
                </View>
    
                </View>
            
              <View style={HomeStyles.chapterInfo}>
              <View style={[HomeStyles.chapterInfo,ContainerChapExt]}>
                <Text style={HomeStyles.chapterTitle}>{item.Title}</Text>
                <Text style={HomeStyles.chapterDescription}>{item.Description}</Text>
              </View>
              </View>
            {/* </View> */}
          </View>
        )
    }
    
    
    return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={HomeStyles.container}>

      <Text style={HomeStyles.title}>Chapters</Text>

      {/* Options */}
      <View style={HomeStyles.optionsContainer}>
        <View style={HomeStyles.option}>
          <Text style={HomeStyles.optionText}>All</Text>
        </View>
        <View style={HomeStyles.option}>
          <Text style={HomeStyles.optionText}>Favourite</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={HomeStyles.searchContainer}>
        <TextInput
          style={HomeStyles.searchInput}
          placeholder="Search"
          placeholderTextColor="#808080"
        />
      </View>

      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <FlatList
      data={ChapterListData}
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