export const validateInput = (inputId, inputValue) => {
  if (inputValue.trim().length === 0) {
    return false;
  }

  switch (inputId) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(inputValue);
    case 'password':
      return inputValue.length >= 6;
    case 'firstName':
    case 'lastName':
      return inputValue.length >= 2;
    case 'confirmPassword':
      return inputValue.length >= 6;
    default:
      return true;
  }
}; 