import { View, TextInput, StyleSheet, TouchableOpacity, Text,Dimensions} from 'react-native';
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height; 
import { Colors } from '../../Global/Styling/Branding';
const AuthStyles = StyleSheet.create({
    container: {
        flex: 1,
        // width:WindowWidth,
        // height:WindowHeight,
        backgroundColor: Colors.MainBgColor,
        justifyContent: 'center',
        alignItems:'center'
        // paddingHorizontal: 30,
      },
      logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop:30
      },
      logoText: {
        fontSize: 24,
        color: Colors.lightTxtClr,
      },
      ImgStyle:{width:150,height:150},
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:Colors.SecondaryDark,
        width:WindowWidth/1.1,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
      },
      input: {
        flex: 1,
        marginLeft: 10,
        color: Colors.lightTxtClr,
      },
      errorText: {
        color: 'red',
        marginBottom: 10,
        alignSelf:'flex-start',
        marginLeft:20
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
        marginBottom: 15,
      },
      buttonText: {
        fontSize: 18,
        marginLeft: 10,
      },
      footer: {
        alignItems: 'center',
        marginTop:40
      },
      footerText: {
        color: Colors.lightTxtClr,
        marginBottom: 10,
      },
    });
    

  export default AuthStyles