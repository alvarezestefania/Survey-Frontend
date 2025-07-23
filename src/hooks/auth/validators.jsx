
const useFormValidation = () => {

  const validatePassword = (password) => {
    const minLength = 8;
    if (!password) {
      return { isValid: false, error: 'La contraseña es requerida.' };
    }
    if (password.length < minLength) {
      return { isValid: false, error: `La contraseña debe tener al menos ${minLength} caracteres.` };
    }
    return { isValid: true, error: '' };
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return { isValid: false, error: 'Por favor, confirma la contraseña.' };
    }
    if (password !== confirmPassword) {
      return { isValid: false, error: 'Las contraseñas no coinciden.' };
    }
    return { isValid: true, error: '' };
  };

  return { validatePassword, validateConfirmPassword };
};

export default useFormValidation;