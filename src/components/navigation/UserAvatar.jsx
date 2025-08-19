import React from 'react';
import { LogOut } from 'lucide-react';

const UserAvatar = ({ onLogout }) => {
  return (
    <div className="relative">
      <button
        onClick={onLogout}
        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-200"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserAvatar;