import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(3).max(15).required("Password is required"),
});

export const passwordUpdateSchema = yup.object().shape({
  oldPassword: yup.string().min(3).max(15).required("Password is required"),
  newPassword: yup.string().min(3).max(15).required("Password is required"),
});

export const registrationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(3).max(15).required("Password is required"),
  fullName: yup.string().min(6).max(32).required("Name is required"),
  phoneNumber: yup
    .string()
    .min(11)
    .max(14)
    .required("Phone Number is required"),
});

export const updateProfileSchema = yup.object().shape({
  fullName: yup.string().min(6).max(32).required("Name is required"),
  phoneNumber: yup
    .string()
    .min(11)
    .max(14)
    .required("Phone Number is required"),
});

export const createTaskSchema = yup.object().shape({
  name: yup.string().min(6).max(32).required("Task name is required"),
  description: yup.string().min(6).required("Description is required"),
  deadLine: yup.string().required("DeadLine is required"),
  category: yup.string().required("Category is required"),
});
