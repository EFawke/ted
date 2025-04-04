import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext.js';
import axios from 'axios';
import './App.css';

const GoogleLoginButton = () => {
  const { login } = useAuth();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { data } = await axios.post(
        'https://tedfawke.com/auth/google',
        { token: tokenResponse.access_token }
      );
      login(data.user, data.token);
      window.location.reload();
    },
    onError: (err) => console.error('Login error', err),
  });

  return (
    <button className="google-signin-btn" onClick={() => loginWithGoogle()}>
      <img
        className="google-icon"
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
      />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
