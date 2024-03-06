import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './Styles';
import { ScrollView } from 'react-native-gesture-handler';

const PrivacyPolicyScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
        <ScrollView
        contentContainerStyle={{alignItems:'center'}}
        >

      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.content}>
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our Bhagavad Gita app. {"\n\n"}
        - We may collect personal information such as your name and email address when you sign up for an account or make a purchase. {"\n\n"}
        - Your personal information is used only for providing and improving the app experience. {"\n\n"}
        - We do not sell or share your personal information with third parties. {"\n\n"}
        - By using the app, you consent to the collection and use of your personal information as described in this Privacy Policy. {"\n\n"}
        We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page. {"\n\n"}
        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
      </Text>
      </ScrollView>

    </View>
  );
};

export default PrivacyPolicyScreen;
