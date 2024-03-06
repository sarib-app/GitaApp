import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './Styles';
import { ScrollView } from 'react-native-gesture-handler';

const TermsConditionsScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
           <ScrollView
        contentContainerStyle={{alignItems:'center'}}
        >


      <Text style={styles.heading}>Terms & Conditions</Text>
      <Text style={styles.content}>
        By using our Bhagavad Gita app, you agree to abide by the following terms and conditions: {"\n\n"}
        - You may use the app for personal and non-commercial purposes only. {"\n\n"}
        - Any commercial use or distribution of the app's content is strictly prohibited. {"\n\n"}
        - We reserve the right to modify or discontinue the app at any time without prior notice. {"\n\n"}
        - Your use of the app constitutes acceptance of these terms and conditions. {"\n\n"}
        We may update our Terms & Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms & Conditions on this page. These changes are effective immediately after they are posted on this page. {"\n\n"}
        If you have any questions or suggestions about our Terms & Conditions, do not hesitate to contact us.
      </Text>
      </ScrollView>

    </View>
  );
};

export default TermsConditionsScreen;
