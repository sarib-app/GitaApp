import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import GlobalStyles from '../../Global/Styling/GlobalStyles';
import { Colors } from '../../Global/Styling/Branding';
import { FlatList } from 'react-native-gesture-handler';
import { ChapterListData } from '../../Global/Data/Data';
import AccountStyle from './AccountStyls';
const AccountScreen = () => {



  
  return (
    <View style={GlobalStyles.container}>
      {/* Title */}
    <View style={AccountStyle.container}>

      <Text style={AccountStyle.title}>Accounts</Text>
      <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{"Subscription Plan"}</Text>

<View style={AccountStyle.chapterInfo}>
       
       <Text style={AccountStyle.chapterTitle}>{"Free Trial"}</Text>
       <Text style={AccountStyle.chapterDescription}>{"Expires in 3 days"}</Text>
    
     </View>
     
  

  

      {/* List of Chapters */}
      {/* You can map over your chapters data and render each chapter */}
      <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{"Full Name"}</Text>

      <View style={AccountStyle.chapterInfo}>
             
             <Text style={AccountStyle.chapterTitle}>{"John Smith"}</Text>
             <Text style={AccountStyle.chapterDescription}>{"Update Account name"}</Text>
          
           </View>


           <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{"Email Address"}</Text>

<View style={AccountStyle.chapterInfo}>
       
       <Text style={AccountStyle.chapterTitle}>{"user@example.com"}</Text>
       <Text style={AccountStyle.chapterDescription}>{"Update Account Email"}</Text>
    
     </View>


     <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{"Password"}</Text>

<View style={[AccountStyle.chapterInfo,{height:50}]}>
       
       <Text style={AccountStyle.chapterTitle}>{"Reset Password"}</Text>
    
     </View>

     <Text style={[AccountStyle.chapterDescription,{marginLeft:0}]}>{"Payment Method"}</Text>

<View style={AccountStyle.chapterInfo}>
       
       <Text style={AccountStyle.chapterTitle}>{"Card ending in 1234"}</Text>
       <Text style={AccountStyle.chapterDescription}>{"Update credit card details"}</Text>
    
     </View>



    </View>

    </View>
  );
};


export default AccountScreen;
const ContainerChapExt ={backgroundColor:Colors.SecondaryDark,marginTop:-2,marginLeft:-2,   justifyContents:'center'}