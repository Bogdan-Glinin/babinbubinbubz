export const getCategoryIcon = (category: string | null, custom: any) => {
  if (custom.length) {
    return custom.find((obj: any) => obj.name === category).icon;
  }
  switch (category) {
    case "Транспорт":
      return "car";
    case "Кафе и рестораны":
      return "cafe";
    case "Супермаркеты":
      return "food";
    case "Одежда и обувь":
      return "clothes";
    case "Здоровье":
      return "medecine";
    default:
      return "money";
  }
};
