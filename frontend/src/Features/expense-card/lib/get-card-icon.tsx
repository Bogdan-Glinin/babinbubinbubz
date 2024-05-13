import {
  CameraOutlined,
  CarOutlined,
  CloudOutlined,
  CoffeeOutlined,
  DesktopOutlined,
  DollarOutlined,
  EuroCircleOutlined,
  ExperimentOutlined,
  GiftOutlined,
  HomeOutlined,
  LaptopOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  PictureOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  WifiOutlined,
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
        return <DollarOutlined style={{ fontSize: "32px" }} />;
    case "technic":
      return <DesktopOutlined style={{ fontSize: "32px" }}/>
    case "chemestry":
      return <ExperimentOutlined style={{ fontSize: "32px" }}/>
    case "camera":
      return <CameraOutlined style={{ fontSize: "32px" }}/>
    case "cloud":
      return <CloudOutlined style={{ fontSize: "32px" }}/>
    case "gift":
      return <GiftOutlined style={{ fontSize: "32px" }}/>
    case "phone":
      return <PhoneOutlined style={{ fontSize: "32px" }}/>
    case "wifi":
      return <WifiOutlined style={{ fontSize: "32px" }}/>
    case "wifi":
      return <WifiOutlined style={{ fontSize: "32px" }}/>
    case "picture":
      return <PictureOutlined style={{ fontSize: "32px" }}/>
    case "home":
      return <HomeOutlined style={{ fontSize: "32px" }}/>
    case "rocket":
      return <RocketOutlined style={{ fontSize: "32px" }}/>
    case "laptop":
      return <LaptopOutlined style={{ fontSize: "32px" }}/>
    case "euro":
      return <EuroCircleOutlined style={{ fontSize: "32px" }}/>
  }
};