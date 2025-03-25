import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import { useEffect } from 'react';
import api from '../api';

const GOOGLE_CLIENT_ID = '57235703429-j5g9l0fhpk0m8ekbpbs3ugp42oefl59u.apps.googleusercontent.com';

function LoginPage() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  // Load stored user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [setUser]);

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
  
    const userData = {
      _id: decoded.sub,  // Google's unique ID
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
  
    try {
      const res = await api.post('/api/auth/google-login', userData, { withCredentials: true });
      const data = res.data;
      if (res.status === 200) {
        console.log("Login successful:", data.user);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="text-white text-6xl font-bold">wac</div>
          </div>
          <h2 className="text-white text-2xl font-bold text-center mb-6">Welcome to Wac Cave</h2>
          <p className="text-gray-400 text-center mb-8">Sign in to continue your experience</p>
          <div className="flex flex-col items-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Login Failed")}
              useOneTap={false}
              theme="filled_black"
              shape="pill"
              size="large"
              width="100%"
              text="continue_with"
              locale="en"
            />
          </div>
        </div>
        <div className="mt-8 text-gray-600 text-sm">
          © 2025 WAC. All rights reserved.
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;


