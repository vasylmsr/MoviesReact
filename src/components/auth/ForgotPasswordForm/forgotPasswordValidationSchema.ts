import * as yup from 'yup';

export const forgotPasswordValidationSchema = yup.object({
  email: yup.string().email().required(),
});
