import React from 'react';
import { getStatusColor } from '../../utils/helpers';

const InvoiceTableRow = ({ invoice }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {invoice.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {invoice.customerName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {invoice.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${invoice.amount.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
          {invoice.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {invoice.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {invoice.dueDate}
      </td>
    </tr>
  );
};

export default InvoiceTableRow;