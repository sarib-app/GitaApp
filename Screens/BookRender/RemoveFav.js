// Function to remove a verse from favorites
import React from 'react';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const removeFromFavorites = async (chapterId, verseNumber) => {
    try {
      // Get existing favorites from AsyncStorage
      const favorites = await AsyncStorage.getItem('favorites');
  
      if (favorites) {
        // Parse the existing favorites
        let updatedFavorites = JSON.parse(favorites);
        // Find the chapter with the given chapterId
        const chapterIndex = updatedFavorites.findIndex(chapter => chapter.id === chapterId);
  
        if (chapterIndex !== -1) {
          // Find the index of the verse to remove in the verses array of the chapter
          const verseIndex = updatedFavorites[chapterIndex].verses.findIndex(verse => verse.verse_number === verseNumber);
  
          if (verseIndex !== -1) {
            // Remove the verse from the verses array of the chapter
            updatedFavorites[chapterIndex].verses.splice(verseIndex, 1);
            // If no more verses are left in the chapter, remove the entire chapter
            if (updatedFavorites[chapterIndex].verses.length === 0) {
              updatedFavorites.splice(chapterIndex, 1);
            }
            // Save the updated favorites to AsyncStorage
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            console.log('Verse removed from favorites successfully!');
            return "success"
          } else {
            console.log('Verse not found in favorites!');
          }
        } else {
          console.log('Chapter not found in favorites!');
        }
      } else {
        console.log('No favorites found!');
      }
    } catch (error) {
      console.error('Error removing verse from favorites:', error);
      return "error"

    }
  };
  

  
  export default removeFromFavorites
  