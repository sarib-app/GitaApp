import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Colors } from '../../Global/Styling/Branding';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height;

const Language = StyleSheet.create({
 

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PrimaryColor,
        width:WindowWidth/1.1,
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
                // padding: 15,
        marginBottom: 15,
      },
      buttonText: {
        fontSize: 18,
        marginLeft: 10,
      },
  
});
export default Language  