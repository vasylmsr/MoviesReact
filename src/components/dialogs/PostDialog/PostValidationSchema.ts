import * as yup from 'yup';

export const postValidationSchema = yup.object({
  title: yup.string().max(128).required(),
  description: yup.string().max(512).required(),
});
