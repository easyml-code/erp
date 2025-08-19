import React, { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import InvoicePage from './pages/InvoicePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <InvoicePage onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;