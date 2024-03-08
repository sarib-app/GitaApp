import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.content}>
        Welcome to our Bhagavad Gita app! Our goal is to provide a platform where users can read Bhagavad Gita in multiple languages including English, Hindi, Marathi, and Gujarati. We strive to make the teachings of Bhagavad Gita accessible to everyone, promoting spiritual growth and understanding.
      </Text>
    </View>
  );
};

const TermsConditionsScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <Text style={styles.heading}>Terms & Conditions</Text>
      <Text style={styles.content}>
        By using our Bhagavad Gita app, you agree to abide by the following terms and conditions: 
        - You may use the app for personal and non-commercial purposes only.
        - Any commercial use or distribution of the app's content is strictly prohibited.
        - We reserve the right to modify or discontinue the app at any time without prior notice.
        - Your use of the app constitutes acceptance of these terms and conditions.
      </Text>
    </View>
  );
};

const PrivacyPolicyScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.content}>
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our Bhagavad Gita app.
        - We may collect personal information such as your name and email address when you sign up for an account or make a purchase.
        - Your personal information is used only for providing and improving the app experience.
        - We do not sell or share your personal information with third parties.
        - By using the app, you consent to the collection and use of your personal information as described in this Privacy Policy.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export { AboutUsScreen, TermsConditionsScreen, PrivacyPolicyScreen };
