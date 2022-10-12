import * as yup from 'yup';

const editUserSchema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  password: yup.string().required('Password is required'),
  oldPassword: yup.string(),
});

export default editUserSchema;
