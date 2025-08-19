import React from 'react';
import { LogOut } from 'lucide-react';

const UserAvatar = ({ onLogout }) => {
  return (
    <div className="relative group">
      <button
        onClick={onLogout}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-transparent hover:bg-gray-100 transition duration-200"
      >
        <LogOut className="w-5 h-5 text-gray-600" />
      </button>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition duration-200">
        Logout
      </div>
    </div>
  );
};

export default UserAvatar;
