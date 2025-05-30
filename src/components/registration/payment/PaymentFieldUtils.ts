
import { format } from 'date-fns';

export const formatFieldLabel = (label: string) => {
  const titleCaseLabels = {
    'invoiceName': 'Invoice Name',
    'invoiceEmail': 'Invoice Email',
    'gstRegistered': 'GST Registered',
    'gstin': 'GSTIN',
    'tdsPercent': 'TDS Percent',
    'address': 'Address',
    'amount': 'Amount'
  };
  
  return titleCaseLabels[label] || label;
};

export const renderFieldValue = (field: string, value: any) => {
  if (field === 'handoverDate' && value instanceof Date) {
    return format(value, "PPP");
  }
  return value;
};

// Static field definitions - based on initial data only, never changes
export const getStaticFieldSegregation = (initialPaymentInfo: any) => {
  if (!initialPaymentInfo) return { preFilledFields: [], missingFields: [] };
  
  const baseFields = ['invoiceName', 'invoiceEmail', 'address'];
  const gstFields = initialPaymentInfo.gstRegistered ? ['gstin', 'tdsPercent'] : [];
  const allFields = [...baseFields, ...gstFields];
  
  // Create static assignment based on initial state only
  const preFilledFields = allFields.filter(field => 
    initialPaymentInfo[field] && initialPaymentInfo[field] !== ''
  );
  
  const missingFields = allFields.filter(field => !preFilledFields.includes(field));
  
  return { preFilledFields, missingFields };
};
