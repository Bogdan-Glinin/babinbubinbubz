import * as yup from "yup";

export const addCustomCategoryValidation = yup.object().shape({
  name: yup
    .string()
    .required("Название обязательно")
    .max(50, "Название не должно превышать 50 символов"),
  type: yup.string().required("Тип категории обязательнен"),
  icon: yup.string().required("Иконка обязательна"),
});
