export const exportToCSV = (data: any[], filename: string, headers?: string[]) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Header row
    csvHeaders.join(','),
    // Data rows
    ...data.map(row => 
      csvHeaders.map(header => {
        const value = row[header];
        // Handle nested objects
        const cellValue = typeof value === 'object' && value !== null 
          ? JSON.stringify(value).replace(/"/g, '""')
          : String(value || '').replace(/"/g, '""');
        // Wrap in quotes if contains comma or newline
        return cellValue.includes(',') || cellValue.includes('\n') 
          ? `"${cellValue}"` 
          : cellValue;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const exportDrugOrdersToCSV = (orders: any[]) => {
  const formatted = orders.map(order => ({
    'Reference Number': order.reference_number,
    'Customer Name': `${order.profiles?.first_name || ''} ${order.profiles?.last_name || ''}`,
    'Email': order.profiles?.email || '',
    'Phone': order.profiles?.phone_number || '',
    'Drug Name': order.drug_categories?.name || '',
    'Drug Type': order.drug_categories?.type || '',
    'Quantity': order.quantity,
    'Total Amount': order.total_amount,
    'Country': order.country,
    'Status': order.status,
    'Order Date': new Date(order.order_date).toLocaleString()
  }));

  exportToCSV(formatted, 'drug_orders');
};

export const exportHospitalBookingsToCSV = (bookings: any[]) => {
  const formatted = bookings.map(booking => ({
    'Reference Number': booking.reference_number,
    'Patient Name': `${booking.profiles?.first_name || ''} ${booking.profiles?.last_name || ''}`,
    'Email': booking.profiles?.email || '',
    'Phone': booking.profiles?.phone_number || '',
    'Hospital Name': booking.hospital_name,
    'Appointment Date': new Date(booking.appointment_date).toLocaleString(),
    'Reason': booking.reason,
    'Country': booking.country,
    'Status': booking.status,
    'Created At': new Date(booking.created_at).toLocaleString()
  }));

  exportToCSV(formatted, 'hospital_bookings');
};

export const exportPremiumSubmissionsToCSV = (submissions: any[]) => {
  const formatted = submissions.map(submission => ({
    'Full Name': submission.full_name,
    'Surname': submission.surname,
    'Email': submission.email,
    'Phone Number': submission.phone_number,
    'Country': submission.country,
    'Submitted At': new Date(submission.submitted_at).toLocaleString()
  }));

  exportToCSV(formatted, 'premium_submissions');
};
