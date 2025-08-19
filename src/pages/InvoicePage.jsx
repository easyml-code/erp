import React, { useState, useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import InvoicesTab from '../components/invoices/InvoicesTab';
import ProductsTab from '../components/products/ProductsTab';
import { fetchAllInvoices, fetchInvoicesPaginated } from '../services/invoiceService';
import { filterInvoices } from '../utils/helpers';

const InvoicePage = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allInvoices, setAllInvoices] = useState([]); // All data for searching
  const [displayedInvoices, setDisplayedInvoices] = useState([]); // Paginated data for display
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('invoices');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const recordsPerPage = 10;

  // Load all invoices for searching
  useEffect(() => {
    const loadAllInvoices = async () => {
      const result = await fetchAllInvoices();
      if (result.success) {
        setAllInvoices(result.data);
      }
    };
    loadAllInvoices();
  }, []);

  // Load paginated invoices for display
  useEffect(() => {
    const loadPaginatedInvoices = async () => {
      setLoading(true);
      setError(null);
      
      const result = await fetchInvoicesPaginated(currentPage, recordsPerPage);
      
      if (result.success) {
        setDisplayedInvoices(result.data);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
      } else {
        setError(result.error);
        setDisplayedInvoices([]);
      }
      
      setLoading(false);
    };

    loadPaginatedInvoices();
  }, [currentPage]);

  // Filter invoices when search term changes
  useEffect(() => {
    if (searchTerm.trim()) {
      // When searching, filter from all data
      const filtered = filterInvoices(allInvoices, searchTerm);
      setFilteredInvoices(filtered);
    } else {
      // When not searching, show paginated data
      setFilteredInvoices(displayedInvoices);
    }
  }, [searchTerm, allInvoices, displayedInvoices]);

  // Refresh invoices function
  const refreshInvoices = async () => {
    setLoading(true);
    setError(null);
    
    // Refresh both all data and paginated data
    const [allResult, paginatedResult] = await Promise.all([
      fetchAllInvoices(),
      fetchInvoicesPaginated(currentPage, recordsPerPage)
    ]);
    
    if (allResult.success && paginatedResult.success) {
      setAllInvoices(allResult.data);
      setDisplayedInvoices(paginatedResult.data);
      setTotalPages(paginatedResult.totalPages);
      setTotalCount(paginatedResult.totalCount);
    } else {
      setError(allResult.error || paginatedResult.error);
    }
    
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchTerm(''); // Clear search when changing pages
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'invoices':
        return (
          <InvoicesTab 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredInvoices={filteredInvoices}
            loading={loading}
            error={error}
            onRefresh={refreshInvoices}
            // Pagination props
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            isSearching={!!searchTerm.trim()}
            allInvoices={allInvoices}
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
            loading={loading}
            error={error}
            onRefresh={refreshInvoices}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            isSearching={!!searchTerm.trim()}
            allInvoices={allInvoices}
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