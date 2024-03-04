import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  configurationEndpoint: 'https://accounts.google.com/.well-known/openid-configuration',
};

const useGoogleLogin = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: false });

    const result = await AuthSession.startAsync({
      authUrl: `${discovery.authorizationEndpoint}?` +
        new URLSearchParams({
          client_id: "482400597606-j3ppuj3um1vcu8eson6jrg5b4bsnfnvo.apps.googleusercontent.com", // Replace with your Client ID from GCP
          redirect_uri: redirectUri,
          response_type: 'code',
          scope: ['profile', 'email'], // Request profile and email scopes
          prompt: 'select_account', // Prompt user to select an account
        }).toString(),
    });

    if (result.type === 'success') {
      return await handleLoginResponse(result.params);
    } else {
      return { error: 'Login cancelled' };
    }
  } catch (error) {
    console.error('Google Sign-In error:', error);
    return { error: 'Login failed' };
  }
};

const handleLoginResponse = async (params) => {
  try {
    const { code } = params;

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: AuthSession.makeRedirectUri({ useProxy: false }),
        client_id: "482400597606-j3ppuj3um1vcu8eson6jrg5b4bsnfnvo.apps.googleusercontent.com", // Replace with your Client ID from GCP
        // client_secret: YOUR_CLIENT_SECRET, // Replace with your Client Secret from GCP (optional)
      }).toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to retrieve access token');
    }

    const profileResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profileData = await profileResponse.json();

    return {
      accessToken: tokenData.access_token,
      profile: profileData,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { error: 'Failed to retrieve user profile' };
  }
};

export default useGoogleLogin;
