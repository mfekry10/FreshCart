import * as yup from "yup";

export const LoginFormValidation = yup.object().shape({
  email: yup.string().email("Wrong Email").required("required"),
  password: yup.string().required("required"),
});


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const RegisterFormValidation = yup.object({
    name:yup.string().min(3,'name is min lenght 3').max(10,'name is max lenght 10').required('name is Required'),
    email:yup.string().email('email is invalid').min(16,'email is min lenght 16').max(40 ,'email is min lenght 16').required('email is required'),
    phone:yup.string().matches(phoneRegExp , 'phone is invalid').required('phone is required'),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is invalid').required('password is required'),
    rePassword:yup.string().oneOf([yup.ref("password")] , " passeord and rePassword are not matched").required('rePassword is required')
  })


