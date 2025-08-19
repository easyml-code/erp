import React, { useState, useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import InvoicesTab from '../components/invoices/InvoicesTab';
import ProductsTab from '../components/products/ProductsTab';
import { dummyInvoices } from '../data/dummyData';
import { filterInvoices } from '../utils/helpers';

const InvoicePage = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState(dummyInvoices);
  const [activeTab, setActiveTab] = useState('invoices');

  useEffect(() => {
    const filtered = filterInvoices(dummyInvoices, searchTerm);
    setFilteredInvoices(filtered);
  }, [searchTerm]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'invoices':
        return (
          <InvoicesTab 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredInvoices={filteredInvoices}
          />
        );
      case 'products':
        return <ProductsTab />;
      default:
        return (
          <InvoicesTab 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredInvoices={filteredInvoices}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default InvoicePage;