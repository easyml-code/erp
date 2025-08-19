import React from 'react';
import InvoiceTableRow from './InvoiceTableRow';

const InvoiceTableHeader = () => {
  const headers = [
    'Invoice Number',
    'PO Number',
    'Vendor',
    'Amount',
    'Status', 
    'Invoice Date'
  ];

  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const InvoiceTable = ({ invoices }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <InvoiceTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <InvoiceTableRow key={invoice.invoiceNumber} invoice={invoice} />
            ))}
          </tbody>
        </table>
      </div>
      
      {invoices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No invoices found matching your search.
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;