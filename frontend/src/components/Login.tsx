import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { baseurl } from '../lib/baseurl';
import { toast } from 'react-toastify';

export const Login = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-orange-100">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">
          Login to IgnisAI
        </h2>
        <p className="text-center text-black mb-6">
          Please log in to access the system
        </p>

        {/* Google Login Button */}
        <GoogleOAuthProvider clientId="">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const tokenId = credentialResponse.credential;
         
              try {
                const result = await axios.post(`${baseurl}/auth/social/`, {
                  token: tokenId,
                }, {
                  headers: {
                    'Content-Type': 'application/json',
                    // If you are using credentials/cookies for authentication, include them here
                    // 'Authorization': `Bearer ${yourToken}`,
                  }
                });
                console.log('Login successful:', result.data);
                toast.success('Login successful!');
              } catch (error) {
                console.error('Error logging in:', error);
                toast.error('Error logging in. Please try again!');
              }
            }}
            onError={() => {
              console.error('Google login failed');
              toast.error('Google login failed! Please try again.');
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};
