import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';

const GoogleLoginButton = () => {
  const responseMessage = async (response) => {
    const token = response.credential;
    
    try {
      const { data } = await axios.post(
        'http://localhost:8000/auth/google',
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Login successful, user data:', data);
      
      // Store the JWT token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // TODO: Add your state management here (context, redux, etc)
      
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Server response:', error.response?.data);
      }
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