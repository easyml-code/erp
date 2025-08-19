import React, { useState } from 'react';
import LoginForm from './LoginForm';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = () => {
    // Dummy authentication - accept any non-empty credentials
    if (credentials.username && credentials.password) {
      onLogin();
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Invoice Manager</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        <LoginForm 
          credentials={credentials}
          setCredentials={setCredentials}
          onLogin={handleLogin}
        />
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Demo: Use any username and password to login
        </div>
      </div>
    </div>
  );
};

export default LoginPage;