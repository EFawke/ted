import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from './AuthContext.js';

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const isProduction = process.env.NODE_ENV === 'production';
  const baseURL = isProduction
    ? 'https://tedfawke.com/'
    : 'http://localhost:8000/';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44px' }}>
      <GoogleOAuthProvider clientId="128885006939-iihg8o4bg4nfb1lt76bhb23t4ustdr2l.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          width="280px"
          height="44px"
          background="white"
          border="unset"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginButton;