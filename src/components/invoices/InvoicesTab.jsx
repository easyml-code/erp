import React from 'react';
import SearchBar from '../common/SearchBar';
import InvoiceTable from './InvoiceTable';

const InvoicesTab = ({ searchTerm, setSearchTerm, filteredInvoices }) => {
  return (
    <>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        placeholder="Search invoices..."
      />
      <InvoiceTable invoices={filteredInvoices} />
    </>
  );
};

export default InvoicesTab;