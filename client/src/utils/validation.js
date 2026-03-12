export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export const validateStrongPassword = (password) => {
  // At least 8 chars, one uppercase, one lowercase, one number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s\-()]{10,15}$/;
  return re.test(phone);
};

export const validateCardNumber = (cardNumber) => {
  const re = /^\d{16}$/;
  return re.test(cardNumber.replace(/\s/g, ''));
};

export const validateCVV = (cvv) => {
  const re = /^\d{3,4}$/;
  return re.test(cvv);
};

export const validateExpiry = (expiry) => {
  const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!re.test(expiry)) return false;
  const [month, year] = expiry.split('/');
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  const expiryYear = parseInt(year, 10);
  const expiryMonth = parseInt(month, 10);
  // Card is valid if expiry year > current year, or same year and expiry month >= current month
  return expiryYear > currentYear || (expiryYear === currentYear && expiryMonth >= currentMonth);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim().length > 0;
};
