export const getStatusColor = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case 'paid':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
    case 'late':
      return 'bg-red-100 text-red-800';
    case 'partial':
    case 'partially paid':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
    case 'canceled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const filterInvoices = (invoices, searchTerm) => {
  if (!searchTerm.trim()) return invoices;
  
  const term = searchTerm.toLowerCase();
  
  return invoices.filter(invoice =>
    invoice.invoiceNumber.toString().toLowerCase().includes(term) ||
    invoice.vendorName.toLowerCase().includes(term) ||
    invoice.vendorId.toLowerCase().includes(term) ||
    invoice.status.toLowerCase().includes(term) ||
    (invoice.poNumber && invoice.poNumber.toString().includes(term)) ||
    (invoice.utrNumber && invoice.utrNumber.toLowerCase().includes(term))
  );
};