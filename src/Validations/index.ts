import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("This field is required!").email("Email is invalid!"),
  password: yup.string().required("This field is required!"),
});

export const registerSchema = yup.object().shape({
  email: yup.string().required("This field is required!").email("Email is invalid!"),
  username: yup.string().required("This field is required!"),
  password: yup.string().required("This field is required!"),
  confirmPassword: yup
    .string()
    .required("This field is required!")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
