import {
  CarOutlined,
  CoffeeOutlined,
  DollarOutlined,
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
} from "@ant-design/icons";

export const getCardIcon = (icon: string | null) => {
  switch (icon) {
    case "car":
      return <CarOutlined style={{ fontSize: "32px" }} />;
    case "cafe":
      return <CoffeeOutlined style={{ fontSize: "32px" }} />;
    case "food":
      return <ShoppingCartOutlined style={{ fontSize: "32px" }} />;
    case "clothes":
      return <SkinOutlined style={{ fontSize: "32px" }} />;
    case "medecine":
      return <MedicineBoxOutlined style={{ fontSize: "32px" }} />;
    case "money":
        return <DollarOutlined style={{ fontSize: "32px" }} />
  }
};
