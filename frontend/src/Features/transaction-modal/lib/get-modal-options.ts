export const getExpenseOptions = (customCateories: any) => {
  const options = [
    {
      label: "Транспорт",
      value: "Транспорт",
    },
    {
      label: "Кафе и рестораны",
      value: "Кафе и рестораны",
    },
    {
      label: "Супермаркеты",
      value: "Супермаркеты",
    },
    {
      label: "Одежда и обувь",
      value: "Одежда и обувь",
    },
    {
      label: "Здоровье",
      value: "Здоровье",
    },
  ]
  if(customCateories){
    return [...options, ...customCateories]
  }
  return options
};
export const getIncomeOptions = (customCateories: any) => {
  const options =  [
    {
      label: "Зарплата",
      value: "Зарплата",
    },
    {
      label: "Премия",
      value: "Премия",
    },
  ];
  if(customCateories){
    return [...options, ...customCateories]
  }
  return options
}
