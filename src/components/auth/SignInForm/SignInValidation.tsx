import * as yup from 'yup';
import { password } from '../../../utils/validationRules';

export default yup.object({
  email: yup.string().email().required(),
  password: password().required(),
});
