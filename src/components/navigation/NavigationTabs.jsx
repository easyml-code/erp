import React from 'react';
import { FileText, Package } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'products', label: 'Products', icon: Package }
  ];

  return (
    <div className="flex space-x-8">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
            activeTab === id
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;