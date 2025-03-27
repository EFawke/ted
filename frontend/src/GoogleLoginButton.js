import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useAuth } from './AuthContext.js';

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const isProduction = process.env.NODE_ENV === 'production';
  const baseURL = isProduction
    ? 'https://tedfawke.com/'
    : 'http://localhost:8000/';

  const responseMessage = async (response) => {
    try {
      const { data } = await axios.post(
        `${baseURL}auth/google`,
        { token: response.credential }
      );
      login(data.user, data.token);
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const errorMessage = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="128885006939-iihg8o4bg4nfb1lt76bhb23t4ustdr2l.apps.googleusercontent.com">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '44px' 
      }}>
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
          text="signin_with"
          shape="rectangular"
          size="large"
          width="300" // Adjust or use '100%' for full container width
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;