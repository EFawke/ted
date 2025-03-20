import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useAuth } from './AuthContext.js';


const GoogleLoginButton = () => {
  const { login } = useAuth();

  const responseMessage = async (response) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/auth/google',
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
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;