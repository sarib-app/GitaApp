import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Colors } from '../../Global/Styling/Branding';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height;

const SubscribeStyle = StyleSheet.create({
 
Title:{
  color:Colors.lightTxtClr,
  fontWeight:'bold',
  fontSize:25,margin:10,marginTop:0
},
  Txt:{
  color:Colors.lightTxtClr,
  fontWeight:'500',
  fontSize:28,marginLeft:10
},
Buttons:{
  width:WindowWidth/1.2,
  borderRadius:8,
  backgroundColor:Colors.PrimaryColor,
  padding:12  ,
  marginTop:10,
  // alignItems:'center'
},
CenterAligner:{flexDirection:'row',alignItems:'center',margin:7}

     
});
export default SubscribeStyle