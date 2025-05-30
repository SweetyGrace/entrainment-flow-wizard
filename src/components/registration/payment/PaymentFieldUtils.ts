
import { format } from 'date-fns';

export const formatFieldLabel = (label: string) => {
  const titleCaseLabels = {
    'invoiceName': 'Invoice name',
    'invoiceEmail': 'Invoice email',
    'gstRegistered': 'GST registered',
    'gstin': 'GSTIN',
    'tdsPercent': 'TDS percent',
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

// Static field definitions
export const getStaticFieldSegregation = (paymentInfo: any) => {
  if (!paymentInfo) return { preFilledFields: [], missingFields: [] };
  
  const baseFields = ['invoiceName', 'invoiceEmail', 'address'];
  const gstFields = paymentInfo.gstRegistered ? ['gstin', 'tdsPercent'] : [];
  const allFields = [...baseFields, ...gstFields];
  
  const preFilledFields = allFields.filter(field => 
    paymentInfo[field] && paymentInfo[field] !== ''
  );
  
  const missingFields = allFields.filter(field => !preFilledFields.includes(field));
  
  return { preFilledFields, missingFields };
};
