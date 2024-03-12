import { View, TextInput, StyleSheet, TouchableOpacity, Text,Dimensions} from 'react-native';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height; 
import { Colors } from '../../Global/Styling/Branding';
const GlobalStyles = StyleSheet.create({
    container: {
        // flex: 1,
        width:WindowWidth,
        height:WindowHeight,
        backgroundColor: Colors.MainBgColor,
        // justifyContent: 'center',
        // alignItems:'center'
        // paddingHorizontal: 30,
      },

    });
    

  export default GlobalStyles