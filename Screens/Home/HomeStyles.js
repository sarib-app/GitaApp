import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Colors } from '../../Global/Styling/Branding';

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('screen').height;

const HomeStyles = StyleSheet.create({
    container: {
        width: WindowWidth / 1.1,
        marginTop: 50,
        alignSelf: 'center'
    },
    title: {
        fontSize: 38,
        color: 'white',
        marginBottom: 20,
        //   marginTop:20
    },
    optionsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignSelf: 'center'
    },
    option: {
        //   flex: 1,
        width: WindowWidth / 2.3,
        height: WindowHeight / 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3C3737',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    optionText: {
        color: 'white',
        fontSize: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        backgroundColor: '#3C3737',
        borderRadius: 8,
        padding: 10,
        color: 'white',
    },
    chapterContainer: {
        width: WindowWidth / 1.12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        //   backgroundColor:"pink",
        marginTop: 10,
    },
    ChapterSrialContainr: {
        width: 55,
        height: 55,
        backgroundColor: Colors.PrimaryColor,
        borderRadius: 7
    },
    serial: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'

    },
    chapterInfo: {
        width: WindowWidth / 1.39,
        height: 55,
        backgroundColor: Colors.PrimaryColor,
        borderRadius: 7
    },
    SettingsCards: {
        width: WindowWidth / 1.1,
        height: 55,
        backgroundColor: Colors.PrimaryColor,
        borderRadius: 7,
        marginTop:10,
        
    },
    chapterTitle: {
        fontSize: 17,
        color: 'white',
        // marginTop: 14,
        marginLeft: 5
    },
    chapterDescription: {
        color: '#808080',
        marginLeft: 5

    },
});
export default HomeStyles  