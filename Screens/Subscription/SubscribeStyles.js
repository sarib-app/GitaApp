import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Colors } from '../../Global/Styling/Branding';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height;

const SubscribeStyle = StyleSheet.create({
 
ContentContainer:{
    width:WindowWidth/1.1,
    paddingTop:30,
    paddingBottom:30,
    borderRadius:10,
    backgroundColor:Colors.SecondaryDark,
    alignItems:'center'
},
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
        marginTop: 15,
      },
      buttonText: {
        fontSize: 18,
        marginLeft: 10,
        color:Colors.lightTxtClr
      },
      SimpleTxt:{color:Colors.lightTxtClr,textAlign:'center',marginTop:10,fontSize:18,width:"90%"},

      bigButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PrimaryColor,
        width:WindowWidth/1.4,
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 30,
                // padding: 15,
        margin: 35,

      },
      BigbuttonText: {
        fontSize: 28,
        marginLeft: 0,
        color:Colors.MainBgColor,
        fontWeight:'bold'
      },

      InputContainer:{
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        height:50,
        backgroundColor: Colors.MainBgColor,
        width:WindowWidth/1.3,
        // borderWidth: 1,
        borderRadius: 10,
        // paddingHorizontal: 17,
        // paddingVertical: 17,
                // padding: 15,
        marginTop: 15,
      },
      InputContainerII:{
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        height:50,
        backgroundColor: Colors.MainBgColor,
        width:WindowWidth/2.7,
        // borderWidth: 1,
        borderRadius: 7,
        // paddingHorizontal: 17,
        // paddingVertical: 17,
                // padding: 15,
        marginTop: 15,
      },
      InputWrapper:{
        flexDirection:'row',
        width:WindowWidth/1.3,
        justifyContent:'space-between'
      },
      PayButtono: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PrimaryColor,
        width:WindowWidth/1.3,
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
                // padding: 15,
        marginTop: 15,
      },
});
export default SubscribeStyle