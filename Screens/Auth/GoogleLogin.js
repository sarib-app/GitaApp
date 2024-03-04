import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "994031876407-mjkoqjg3h8t2pkcsojuboqldgeneu8l8.apps.googleusercontent.com",
    iosClientId: "994031876407-u70m1ikmfsg3p1o23lmml63bac8p0sc0.apps.googleusercontent.com",
    expoClientId: "994031876407-co912b9906jae1lkfmss2ku58kniggs8.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
       getUserData(response.authentication.accessToken)
    }
  }, [response]);

  async function getUserData(token) {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}`}
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Text style={{justifyContent:'center',fontSize:20}}>dasdsa</Text>
      <Button 
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({showInRevents: true}) }}
      />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});