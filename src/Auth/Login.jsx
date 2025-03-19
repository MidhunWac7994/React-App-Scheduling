import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import { useEffect, useState } from 'react';

const GOOGLE_CLIENT_ID = '57235703429-j5g9l0fhpk0m8ekbpbs3ugp42oefl59u.apps.googleusercontent.com';

function LoginPage() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const [storedUser, setStoredUser] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);

    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(decoded));

    try {
      const res = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Login successful:", data.user);
        setUser(data.user);
        navigate('/home');
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setStoredUser(userData);
    } else {
      // User is not logged in, navigate to login page
      navigate('/');
    }
  }, []);

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
            <div className="google-btn-wrapper w-full mb-6">
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
            <div className="flex items-center w-full mb-6">
              <div className="flex-1 h-px bg-gray-800"></div>
              <div className="px-4 text-sm text-gray-500">or</div>
              <div className="flex-1 h-px bg-gray-800"></div>
            </div>
            <button className="w-full py-3 px-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition duration-300 mb-4">
              Continue as Guest
            </button>
            <p className="text-gray-500 text-sm text-center mt-6">
              By continuing, you agree to our <a href="#" className="text-white underline">Terms of Service</a> and <a href="#" className="text-white underline">Privacy Policy</a>
            </p>
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