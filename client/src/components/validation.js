//validateCreate.js
// Validate that the name only contains letters and spaces
const validateName = (name) => /^[A-Za-z\s]+$/.test(name);

// Validate that the email follows a proper email format
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Validate that the password is at least 8 characters long
const validatePassword = (password) => password.length >= 8;

// Combined validation for the Create Account form
const validateCreate = (name, email, password) =>
  name.trim() !== "" &&
  validateName(name) &&
  email.trim() !== "" &&
  validateEmail(email) &&
  password.trim() !== "" &&
  validatePassword(password);

// Validation for the Login form
const validateLogin = (email, password) =>
  email.trim() !== "" && password.trim() !== "" && validateEmail(email);

// Validation for numbers (e.g., deposits, withdrawals)
const validNumber = (amount) => /^\d*\.?\d+$/.test(amount);

// Check if the amount is above zero
const aboveZero = (amount) => {
  if (!validNumber(amount)) {
    return false;
  }
  const numericAmount = Number(amount);
  return numericAmount > 0;
};

// Check if the balance is sufficient for withdrawal
const sufficientFunds = (amount, balance) => {
  if (!validNumber(amount) || !aboveZero(amount)) {
    return false; // Ensure that amount is valid and greater than zero
  }
  return Number(amount) <= balance;
};
//Combined validation for deposits
const validateDeposit = (amount) => {
  if (amount.trim() === "") return false; // Check for empty input
  if (!validNumber(amount)) return false; // Check for valid number
  return aboveZero(amount); // Check if amount is above zero
};

// Combined validation for withdrawals

const validateWithdrawal = (amount, balance) => {
  if (amount.trim() === "") return false; // Check for empty input
  if (!validNumber(amount)) return false; // Check for valid number
  if (!aboveZero(amount)) return false; // Check if amount is above zero
  return sufficientFunds(amount, balance); // Check if sufficient funds
};

export {
  validateName,
  validateEmail,
  validatePassword,
  validateCreate,
  validateLogin,
  validNumber,
  aboveZero,
  sufficientFunds,
  validateDeposit,
  validateWithdrawal,
};
