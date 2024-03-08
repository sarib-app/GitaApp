import React from 'react';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchFavorites = async (id) => {
    try {
      // Get existing favorites from AsyncStorage
      const ParsedFav = await AsyncStorage.getItem('favorites');
      // return favorites ? JSON.parse(favorites) : [];
      const favorites = JSON.parse(ParsedFav)
      const chapterFavorites = favorites.find(chapter => chapter.id === id);
      const favoriteVerses = chapterFavorites ? chapterFavorites.verses.map(verse => verse.verse_number) : [];
      return favoriteVerses
    // Filter the data array to include only favorite verses
    // const filteredData = data.filter(verse => favoriteVerses.includes(verse.verse_number));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  }

  export default fetchFavorites