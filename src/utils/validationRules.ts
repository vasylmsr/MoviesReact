import * as yup from 'yup';

export const password = () =>
  yup
    .string()
    .min(8)
    .max(255)
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      'Password should contain at least 1 digit and 1 uppercase letter and 1 lowercase letter',
    );
