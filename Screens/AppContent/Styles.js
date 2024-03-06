import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Colors } from '../../Global/Styling/Branding';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop:70,
      color: '#fff',
      marginBottom: 20,
    },
    content: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    },
  });
export default styles  