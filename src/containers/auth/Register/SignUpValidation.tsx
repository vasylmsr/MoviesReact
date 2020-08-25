import * as yup from 'yup';

export const signUpValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(255).required(),
});
