import { isEmail, isAlpha, isLength, escape, normalizeEmail } from "validator";

type ValidatorType = {
  passed: boolean;
  message: string;
};

function validateName(name: string): ValidatorType {
  const sanitizedName = escape(name.trim());

  if (sanitizedName.length === 0) {
    return {
      passed: false,
      message: "Name cannot be empty.",
    };
  }

  if (!isAlpha(sanitizedName.replace(/\s/g, ""))) {
    return {
      passed: false,
      message: "Name must contain only alphabetical letters.",
    };
  }

  if (!isLength(sanitizedName, { min: 2, max: 26 })) {
    return {
      passed: false,
      message: "Name must be between 2 and 26 characters long.",
    };
  }

  return {
    passed: true,
    message: "Success",
  };
}

function validateEmail(email: string): ValidatorType {
  const validEmail = isEmail(email);
  if (!validEmail) {
    return {
      passed: false,
      message:
        "Invalid email format. Please include '@' and a domain, such as '.com'.",
    };
  }

  const normalizedEmail = normalizeEmail(email.trim()); // EMAIL.COM -> email.com

  if (!normalizedEmail) {
    return {
      passed: false,
      message: "Invalid email address. Please check and try again.",
    };
  }

  return {
    passed: true,
    message: "Success",
  };
}

function validatePassword(password: string): ValidatorType {
  const passwordMinLength = 6; // Minimum length for password
  const allowedCharacterPattern =
    /^[\p{L}0-9!@#$%^&*()_+{}[\]:;"'<>,.?/~`\\-]*$/u; // Define allowed characters including Unicode letters

  if (password.length < passwordMinLength) {
    return {
      passed: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  if (!allowedCharacterPattern.test(password)) {
    return {
      passed: false,
      message:
        "Password contains invalid characters. Only letters, numbers, and special characters are allowed.",
    };
  }

  return {
    passed: true,
    message: "Success",
  };
}

export function validateSignupDetails(details: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = details;

  const nameValidation = validateName(name);
  if (!nameValidation.passed) {
    return {
      passed: false,
      message: nameValidation.message,
    };
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.passed) {
    return {
      passed: false,
      message: emailValidation.message,
    };
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.passed) {
    return {
      passed: false,
      message: passwordValidation.message,
    };
  }

  return {
    passed: true,
    message: "Success",
  };
}
