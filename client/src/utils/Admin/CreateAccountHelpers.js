// Validation Regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

export function validateCreateAccountData(formData) {
  let error = {
    userId: "",
    fullName: "",
    email_phone: "",
    password: "",
    confirmPassword: "",
  };
  let hasError = false;

  const { fullName, email_phone, password, confirmPassword, userId } = formData;

  //userId
  if (!userId.value || userId.value === " ") {
    error.userId = "User ID is Required";
    hasError = true;
  }

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
