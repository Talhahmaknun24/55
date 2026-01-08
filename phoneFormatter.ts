
/**
 * Implement phone number formatting logic: 
 * Remove spaces/dashes.
 * If 11 digits starting with '0', remove the '0'.
 * If 13 digits starting with '+880', extract the last 10 digits.
 */
export const formatPhoneNumber = (input: string): string => {
  // Remove spaces and dashes
  let cleaned = input.replace(/[\s-]/g, '');

  // If 13 digits starting with '+880', extract the last 10 digits
  if (cleaned.length === 14 && cleaned.startsWith('+880')) {
    return cleaned.slice(-10);
  }
  
  // If it starts with 880 (without +) and is 13 digits
  if (cleaned.length === 13 && cleaned.startsWith('880')) {
      return cleaned.slice(-10);
  }

  // If 11 digits starting with '0', remove '0'
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return cleaned.substring(1);
  }

  return cleaned;
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Basic validation for numbers after formatting (usually 10 digits in this context)
  return /^\d+$/.test(phone) && phone.length >= 8;
};
