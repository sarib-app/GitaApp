import React from 'react';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const addToFavorites = async (chapterId,Title, verse) => {
    try {
      // Get existing favorites from AsyncStorage
      const favorites = await AsyncStorage.getItem('favorites');
      let updatedFavorites = [];
  
      console.log(favorites)
  
      if (favorites) {
        // Parse the existing favorites
        updatedFavorites = JSON.parse(favorites);
        // Find the chapter with the given chapterId, if it exists
        const chapterIndex = updatedFavorites.findIndex(chapter => chapter.id === chapterId);
  
        if (chapterIndex !== -1) {
          // If chapter with the given chapterId exists, add the verse to its verses array
          updatedFavorites[chapterIndex].verses.push(verse);
        } else {
          // If chapter with the given chapterId does not exist, create a new chapter and add the verse
          updatedFavorites.push({
            id: chapterId,
            Title:Title,
            verses: [verse]
          });
        }
      } else {
        // If no favorites exist, create a new chapter with the given chapterId and add the verse
        updatedFavorites.push({
          id: chapterId,
          Title:Title,
          verses: [verse]
        });
      }
  
      // Save the updated favorites to AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      console.log('Verse added to favorites successfully!');
      return "success"
    } catch (error) {
      console.error('Error adding verse to favorites:', error);
      return "error"
    }
  };
  export default addToFavorites