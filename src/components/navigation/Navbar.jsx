import React from 'react';
import NavigationTabs from './NavigationTabs';
import UserAvatar from './UserAvatar';

const Navbar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <UserAvatar onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;