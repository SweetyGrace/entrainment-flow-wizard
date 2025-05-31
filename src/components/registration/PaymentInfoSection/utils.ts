
import { format } from 'date-fns';
import { PaymentInfo } from './types';

export const formatFieldLabel = (label: string): string => {
  const titleCaseLabels: Record<string, string> = {
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

export const renderFieldValue = (field: string, value: any): string => {
  if (field === 'handoverDate' && value instanceof Date) {
    return format(value, "PPP");
  }
  return value;
};

export const getInitialFieldCategories = (paymentInfo?: PaymentInfo) => {
  if (!paymentInfo || Object.keys(paymentInfo).length === 0) {
    return { 
      preFilledFields: [], 
      missingFields: ['invoiceName', 'invoiceEmail', 'address'],
      gstWasInitiallyRegistered: false
    };
  }
  
  const baseRequiredFields = ['invoiceName', 'invoiceEmail', 'address'];
  const gstWasRegistered = Boolean(paymentInfo.gstRegistered);
  const gstFields = gstWasRegistered ? ['gstin', 'tdsPercent'] : [];
  const allRelevantFields = [...baseRequiredFields, ...gstFields];
  
  const preFilledFields = allRelevantFields.filter(field => {
    const value = paymentInfo[field as keyof PaymentInfo];
    return value !== undefined && value !== null && value !== '';
  });
  
  const missingFields = allRelevantFields.filter(field => !preFilledFields.includes(field));
  
  return { 
    preFilledFields, 
    missingFields, 
    gstWasInitiallyRegistered: gstWasRegistered 
  };
};
