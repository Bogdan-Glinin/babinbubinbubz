import * as yup from 'yup'

export const validationSchema = yup.object().shape({
    name: yup.string().required('Имя обязательно').max(60, 'Имя не должно превышать 60 символов'),
    login: yup.string().required('Номер телефона обязателен'),
    password: yup.string().required('Пароль обязателен').min(8, 'Пароль должен содержать минимум 8 символов'),
    passwordRepeat: yup.string()
      .required('Повторение пароля обязательно')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .min(8, 'Повторение пароля должно содержать минимум 8 символов'),
  });