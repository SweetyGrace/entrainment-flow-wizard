
// Helper function to safely convert field values to strings for form inputs
export const convertToInputValue = (value: any): string => {
  if (value === null || value === undefined) {
    return "";
  }
  
  if (typeof value === "boolean") {
    return value.toString();
  }
  
  if (value instanceof Date) {
    return value.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  }
  
  if (typeof value === "number") {
    return value.toString();
  }
  
  return String(value);
};
