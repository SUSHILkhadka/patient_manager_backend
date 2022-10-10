import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password is of length less than 3')
    .max(25, 'Password too long')
    .required('Password is required'),
});

export default registerSchema;
