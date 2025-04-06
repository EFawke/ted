import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext.js';
import axios from 'axios';
import '../css/App.css';

const GoogleLoginButton = () => {
  const { login } = useAuth();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      login(data, access_token); // Or your app-specific logic
    },
    flow: 'implicit', // token flow (uses iframe not popup)
  });
  
  

  return (
    <button className="google-signin-btn" onClick={loginWithGoogle}>
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
