import React from 'react';
import { useToken } from '../hooks';
import TokenManager from '../services/tokenManager';

/**
 * Example component demonstrating how to use the TokenManager and useToken hook
 * This shows various common use cases for token management
 */
const TokenManagerExample: React.FC = () => {
  const { 
    isLoggedIn, 
    userRole, 
    userEmail, 
    logout, 
    refreshToken,
    isLoading 
  } = useToken();

  const handleManualRefresh = async () => {
    const newToken = await refreshToken();
    if (newToken) {
      console.log('Token refreshed successfully');
    } else {
      console.log('Token refresh failed');
    }
  };

  const handleForceLogout = async () => {
    await logout();
  };

  const checkTokenExpiry = () => {
    const token = TokenManager.currentAccessToken;
    if (token) {
      const isExpired = TokenManager.isTokenExpired(token);
      alert(`Token is ${isExpired ? 'expired' : 'valid'}`);
    } else {
      alert('No token found');
    }
  };

  const getUserInfo = () => {
    const info = TokenManager.getUserInfo();
    console.log('User Info:', info);
    alert(`Email: ${info.email}, Role: ${info.role}`);
  };

  if (isLoading) {
    return <div>Loading token information...</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Token Manager Example</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Current Status:</h3>
          <p>Logged In: {isLoggedIn ? '✅' : '❌'}</p>
          <p>Email: {userEmail || 'N/A'}</p>
          <p>Role: {userRole || 'N/A'}</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleManualRefresh}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!isLoggedIn}
          >
            Refresh Token
          </button>

          <button
            onClick={checkTokenExpiry}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={!isLoggedIn}
          >
            Check Token Expiry
          </button>

          <button
            onClick={getUserInfo}
            className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            disabled={!isLoggedIn}
          >
            Get User Info
          </button>

          <button
            onClick={handleForceLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={!isLoggedIn}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenManagerExample;
