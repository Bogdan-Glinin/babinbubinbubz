import * as yup from "yup";

export const expenseValidation = yup.object().shape({
  transactionCategory: yup.string().required("Категория обязательна"),
  transactionType: yup.string().required("Тип операции обязательнен"),
  card: yup.string().required("Счет списания обязателен"),
  transactionName: yup.string().required("Имя обязателено"),
  transactionAmount: yup.string().required("Сумма обязателена"),
})

export const incomeValidation = yup.object().shape({
  transactionCategory: yup.string().required("Категория обязательна"),
  transactionType: yup.string().required("Тип операции обязательнен"),
  card: yup.string().required("Счет списания обязателен"),
  transactionAmount: yup.string().required("Сумма обязателена"),
});
