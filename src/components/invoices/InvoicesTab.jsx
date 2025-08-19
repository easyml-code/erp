import React from 'react';
import { RefreshCw, Download } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import InvoiceTable from './InvoiceTable';
import { downloadCSV } from '../../utils/csvUtils';

const Pagination = ({ currentPage, totalPages, totalCount, onPageChange, isSearching }) => {
  if (isSearching || totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{(currentPage - 1) * 10 + 1}</span>
            {' '}to{' '}
            <span className="font-medium">
              {Math.min(currentPage * 10, totalCount)}
            </span>
            {' '}of{' '}
            <span className="font-medium">{totalCount}</span>
            {' '}results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const InvoicesTab = ({ 
  searchTerm, 
  setSearchTerm, 
  filteredInvoices, 
  loading, 
  error, 
  onRefresh,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  isSearching,
  allInvoices
}) => {
  const handleDownloadCSV = () => {
    // If searching, download filtered results; otherwise download all data
    const dataToDownload = isSearching ? filteredInvoices : allInvoices;
    const fileName = `invoices_${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(dataToDownload, fileName);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          placeholder="Search invoices..."
        />
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadCSV}
            disabled={loading || (!isSearching && allInvoices.length === 0) || (isSearching && filteredInvoices.length === 0)}
            className="flex items-center px-4 py-2 bg-green-300 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </button>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading invoices
              </h3>
              <p className="mt-2 text-sm text-red-700">
                {error}
              </p>
              <button
                onClick={onRefresh}
                className="mt-3 text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {isSearching && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-700">
            Showing {filteredInvoices.length} results for "{searchTerm}"
          </p>
        </div>
      )}

      {loading ? (
        <div className="bg-white shadow rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading invoices...</span>
          </div>
        </div>
      ) : (
        <>
          <InvoiceTable invoices={filteredInvoices} />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={onPageChange}
            isSearching={isSearching}
          />
        </>
      )}
    </>
  );
};

export default InvoicesTab;