const validateCustomCode = (code) => /^[a-zA-Z0-9]{4,12}$/.test(code);

export default validateCustomCode;
