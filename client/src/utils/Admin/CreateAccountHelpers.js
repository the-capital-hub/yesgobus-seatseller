// Validation Regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

// form initial state
export const INITIAL_REGISTER_FORMDATA = [
  {
    name: ["firstName"],
    value: "",
  },
  {
    name: ["lastName"],
    value: "",
  },
  {
    name: ["phNum"],
    value: "",
  },
  {
    name: ["email"],
    value: "",
  },
  {
    name: ["pincode"],
    value: "",
  },
  {
    name: ["accHolderName"],
    value: "",
  },
  {
    name: ["bankAccNum"],
    value: "",
  },
  {
    name: ["ifsc"],
    value: "",
  },
];

export function validateCreateAccountData(formData) {
  let error = {
    fullName: "",
    email_phone: "",
    password: "",
    confirmPassword: "",
  };
  let hasError = false;

  const { fullName, email_phone, password, confirmPassword } = formData;

  //   full name
  if (!fullName.value || fullName.value === " ") {
    error.fullName = "Full Name is Required";
    hasError = true;
  }

  //   email or phone
  if (!email_phone.value) {
    error.email_phone = "Email or Phone Number is Required";
    hasError = true;
  } else if (
    !EMAIL_REGEX.test(email_phone.value) &&
    !PHONE_REGEX.test(email_phone.value)
  ) {
    error.email_phone = "Valid Email or Phone Number is Required";
    hasError = true;
  }

  //   password
  if (!password.value || password.value === " ") {
    error.password = "Valid Password is Required";
    hasError = true;
  }

  //  confirm password
  if (!confirmPassword.value || confirmPassword.value === " ") {
    error.confirmPassword = "Please Confirm Password";
    hasError = true;
  }
  if (confirmPassword.value !== password.value) {
    error.confirmPassword = "Both passwords should match";
    hasError = true;
  }

  return { error, hasError };
}
