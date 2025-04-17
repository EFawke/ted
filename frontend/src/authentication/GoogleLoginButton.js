import { useAuth } from './AuthContext';
import apiClient from './api/client';
import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginButton() {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await apiClient.post('/google', {
        token: credentialResponse.credential
      });

      login(response.data.user, response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // <GoogleLogin
    //   onSuccess={handleSuccess}
    //   onError={() => console.error('Login Failed')}
    //   useOneTap
    //   auto_select
    //   shape="rectangular"
    //   theme="outline"
    // />
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error('Login Failed')}
      useOneTap
      shape="rectangular"
      theme="outline"
      text="signin_with"
    />

  );
}

export default GoogleLoginButton;