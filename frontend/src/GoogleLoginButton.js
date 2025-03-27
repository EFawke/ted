import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { useAuth } from './AuthContext.js';
import './App.css';

const GoogleLoginButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google === undefined) {
      console.warn('Google SDK not loaded - check ad blockers');
    }
  }, []);
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
      <div className="google-auth-wrapper">
      {isMounted && (
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
          use_fedcm_supported={false}
          text="signin_with"
          shape="rectangular"
          size="large"
          width="300" // Adjust or use '100%' for full container width
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;