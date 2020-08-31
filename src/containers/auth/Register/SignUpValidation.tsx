import * as yup from 'yup';
import { password } from '../../../utils/validationRules';

export const signUpValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: password().required(),
});
