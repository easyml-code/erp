import { supabase } from '../config/supabase';

// Transform Supabase data to match our component structure
const transformInvoiceData = (supabaseData) => {
  return supabaseData.map(invoice => ({
    invoiceNumber: invoice.invoice_number,
    poNumber: invoice.po_number,
    vendorId: invoice.vendor_id,
    vendorName: invoice.vendor_name || 'N/A',
    amount: parseFloat(invoice.invoice_total || 0), // Keep original amount
    status: invoice.payment_status || 'Unknown',
    invoiceDate: invoice.invoice_date || 'N/A',
    dueDate: invoice.due_date || 'N/A',
    // Additional fields from your schema
    paymentTerms: invoice.payment_terms,
    paymentDate: invoice.payment_date,
    daysOverdue: invoice.days_overdue,
    amountPaid: parseFloat(invoice.amount_paid || 0),
    amountDue: parseFloat(invoice.amount_due || 0),
    pendingType: invoice.pending_type,
    reason: invoice.reason,
    poCategorySpend: invoice.po_category_spend,
    utrNumber: invoice.utr_number
  }));
};

// Fetch all invoices for searching (no pagination)
export const fetchAllInvoices = async () => {
  try {
    const { data, error } = await supabase
      .from('invoice_details')
      .select('*')
      .order('invoice_date', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: transformInvoiceData(data || [])
    };
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Fetch paginated invoices for display
export const fetchInvoicesPaginated = async (page = 1, limit = 10) => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('invoice_details')
      .select('*', { count: 'exact' })
      .order('invoice_date', { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: transformInvoiceData(data || []),
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching paginated invoices:', error);
    return {
      success: false,
      error: error.message,
      data: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1
    };
  }
};

// Legacy function for backward compatibility
export const fetchInvoices = fetchAllInvoices;