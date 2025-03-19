import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First name must contain only alphabets")
    .min(3, "First name must be at least 3 characters long")
    .max(20, "First name must be at most 20 characters long")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last name must contain only alphabets")
    .min(3, "Last name must be at least 3 characters long")
    .max(20, "Last name must be at most 20 characters long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/\d/, "Password must include at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must include at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  age: Yup.number()
    .min(10, "Age must be between 10 and 80")
    .max(80, "Age must be between 10 and 80")
    .integer("Age must be an integer")
    .required("Age is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  about: Yup.string()
    .max(100, "About field must be at most 100 characters")
    .required("About is required"),
});

export const profileValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First name must contain only alphabets")
    .min(3, "First name must be at least 3 characters long")
    .max(20, "First name must be at most 20 characters long")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last name must contain only alphabets")
    .min(3, "Last name must be at least 3 characters long")
    .max(20, "Last name must be at most 20 characters long"),

  age: Yup.number()
    .min(10, "Age must be between 10 and 80")
    .max(80, "Age must be between 10 and 80")
    .integer("Age must be an integer")
    .required("Age is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  about: Yup.string()
    .max(100, "About field must be at most 100 characters")
    .required("About is required"),
});
