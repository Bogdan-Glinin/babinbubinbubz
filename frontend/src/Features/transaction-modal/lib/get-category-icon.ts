export const getCategoryIcon = (category: string | null) => {
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
