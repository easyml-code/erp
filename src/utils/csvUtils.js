export const downloadCSV = (data, filename = 'invoices.csv') => {
  if (!data || data.length === 0) {
    alert('No data to download');
    return;
  }

  // Define headers for CSV
  const headers = [
    'Invoice Number',
    'PO Number', 
    'Vendor ID',
    'Vendor Name',
    'Amount',
    'Status',
    'Invoice Date',
    'Due Date',
    'Payment Terms',
    'Days Overdue',
    'Amount Paid',
    'Amount Due',
    'UTR Number'
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(invoice => [
      invoice.invoiceNumber,
      invoice.poNumber || '',
      invoice.vendorId || '',
      `"${invoice.vendorName || ''}"`, // Wrap in quotes in case of commas in name
      invoice.amount || 0,
      invoice.status || '',
      invoice.invoiceDate || '',
      invoice.dueDate || '',
      invoice.paymentTerms || '',
      invoice.daysOverdue || 0,
      invoice.amountPaid || 0,
      invoice.amountDue || 0,
      invoice.utrNumber || ''
    ].join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};