import BaseCard from "./../../Shared/ui/base-card";
import styled from "styled-components";
import { Button, Input, message, Modal, Radio, Spin, Tooltip } from "antd";
import {
  AreaChartOutlined,
  CameraOutlined,
  CloudOutlined,
  DesktopOutlined,
  EuroCircleOutlined,
  ExperimentOutlined,
  GiftOutlined,
  HomeOutlined,
  LaptopOutlined,
  PhoneOutlined,
  PictureOutlined,
  PieChartOutlined,
  PlusSquareOutlined,
  RocketOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import logo from "/dashboard-images/logo.png";
import {
  GetUserDataDocument,
  useGetUserDataQuery,
} from "../../Entities/profile/queries/get-user-data.gen";
import { useEffect, useState } from "react";
import StyledContainer from "../../Shared/ui/container";
import Cookies from "js-cookie";
import { useAddCustomCategoryMutation } from "../../Entities/profile/mutations/add-custom-category.gen";
import { addCustomCategoryValidation } from "../../Entities/profile/lib/add-custom-category-validation";
import { ValidationError } from "yup";
import { getCardIcon } from "../../Features/expense-card/lib/get-card-icon";

const Profile = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const [addCategoryName, setAddCategoryName] = useState("");
  const [addCategotyType, setAddCategoryType] = useState("expense");
  const [addCategoryExpenseIcon, setAddCategoryExpenseIcon] = useState("");
  const [addCategoryIncomeIcon, setAddCategoryIncomeIcon] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { data: userData, loading: userDataLoading } = useGetUserDataQuery();
  const [createCustomCategory, {}] = useAddCustomCategoryMutation();

  const confirmAddCategoryModal = () => {
    setIsButtonDisabled(true);
    try {
      addCustomCategoryValidation.validateSync(
        {
          name: addCategoryName,
          type: addCategotyType,
          icon:
            addCategotyType === "expense"
              ? addCategoryExpenseIcon
              : addCategoryIncomeIcon,
        },
        { abortEarly: false }
      );
      createCustomCategory({
        variables: {
          categoryData: {
            name: addCategoryName,
            type: addCategotyType,
            icon:
              addCategotyType === "expense"
                ? addCategoryExpenseIcon
                : addCategoryIncomeIcon,
          },
        },
        refetchQueries: [
          {
            query: GetUserDataDocument,
          },
        ],
      }).then(() => setIsButtonDisabled(false));
      setAddCategoryModal();
      setAddCategoryStateNull();
    } catch (error) {
      if (error instanceof ValidationError) {
        error.errors.map((e) => message.error(e));
      }
    }
  };

  const setAddCategoryModal = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
  };

  const setAddCategoryStateNull = () => {
    setAddCategoryName("");
    setAddCategoryType("expense");
    setAddCategoryExpenseIcon("");
    setAddCategoryIncomeIcon("");
  };

  const logOut = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (userData?.userCards) {
      let total = 0;
      userData?.userCards?.map((e) => {
        if (e?.iscredit) {
          //@ts-ignore
          total += e?.balance - e?.limit;
        } else {
          //@ts-ignore
          total += e?.balance;
        }
      });
      setTotalMoney(total);
    }
  }, [userData]);

  if (userDataLoading) {
    return <Spin size="large" />;
  }

  return (
    <StyledContainer style={{ height: "97vh" }}>
      <StyledBaseCard>
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} width={100} alt="" />
            <div style={{ width: 700 }}>
              <StyledSpan>Бабынбубынбуз Аналитикс</StyledSpan>
            </div>
          </div>
          <div>
            <Tooltip title="Кредиты">
              <Button type="text" href="/credit">
                <AreaChartOutlined style={{ fontSize: 32, color: "#fff" }} />
              </Button>
            </Tooltip>
            <Tooltip title="Финансы">
              <Button type="text" href="/main" style={{ marginRight: "1vw" }}>
                <PieChartOutlined style={{ fontSize: 32, color: "#fff" }} />
              </Button>
            </Tooltip>
          </div>
        </Header>
      </StyledBaseCard>
      <BaseCard style={{ margin: "1vh", marginLeft: 0, marginRight: 0 }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>Профиль</div>
        <div>
          <div>Имя: {userData?.user?.name}</div>
          <div>Номер: {userData?.user?.phonenumber}</div>
          <div>
            Тип подписки:{" "}
            {userData?.user?.subscriptiontype === "base"
              ? "Базовая"
              : "Премиум"}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>Дополнительные категории: </div>{" "}
            {userData?.userCustomCategories?.length ? (
              userData?.userCustomCategories.map((e: any) => (
                <div>
                  <div>{e.name}</div>
                  <div>{e.type === 'expense' ? "Расход" : "Доход"}</div>
                  <div>{getCardIcon(e.icon)}</div>
                </div>
              ))
            ) : (
              <div>у вас нет кастомных категорий</div>
            )}
            <div>
              <Tooltip title="Добавить категорию">
                <Button type="text" onClick={setAddCategoryModal}>
                  <PlusSquareOutlined style={{ fontSize: 18 }} />
                </Button>
              </Tooltip>
              <Modal
                open={isAddCategoryModalOpen}
                title="Добавление категории"
                onOk={confirmAddCategoryModal}
                onCancel={setAddCategoryModal}
              >
                <div>Название категории: </div>
                <Input
                  value={addCategoryName}
                  onChange={(e) => setAddCategoryName(e.target.value)}
                />
                <div>Тип категории: </div>
                <Radio.Group
                  value={addCategotyType}
                  onChange={(e) => setAddCategoryType(e.target.value)}
                >
                  <Radio.Button value={"expense"}>Расход</Radio.Button>
                  <Radio.Button value={"income"}>Доход</Radio.Button>
                </Radio.Group>
                <div>Иконка: </div>
                {addCategotyType === "expense" ? (
                  <Radio.Group
                    value={addCategoryExpenseIcon}
                    onChange={(e) => setAddCategoryExpenseIcon(e.target.value)}
                  >
                    <Radio.Button value="technic">
                      <DesktopOutlined />
                    </Radio.Button>
                    <Radio.Button value="chemestry">
                      <ExperimentOutlined />
                    </Radio.Button>
                    <Radio.Button value="camera">
                      <CameraOutlined />
                    </Radio.Button>
                    <Radio.Button value="cloud">
                      <CloudOutlined />
                    </Radio.Button>
                    <Radio.Button value="gift">
                      <GiftOutlined />
                    </Radio.Button>
                    <Radio.Button value="phone">
                      <PhoneOutlined />
                    </Radio.Button>
                    <Radio.Button value="wifi">
                      <WifiOutlined />
                    </Radio.Button>
                    <Radio.Button value="picture">
                      <PictureOutlined />
                    </Radio.Button>
                    <Radio.Button value="home">
                      <HomeOutlined />
                    </Radio.Button>
                  </Radio.Group>
                ) : (
                  <Radio.Group
                    value={addCategoryIncomeIcon}
                    onChange={(e) => setAddCategoryIncomeIcon(e.target.value)}
                  >
                    <Radio.Button value="euro">
                      <EuroCircleOutlined />
                    </Radio.Button>
                    <Radio.Button value="rocket">
                      <RocketOutlined />
                    </Radio.Button>
                    <Radio.Button value="laptop">
                      <LaptopOutlined />
                    </Radio.Button>
                    <Radio.Button value="gift">
                      <GiftOutlined />
                    </Radio.Button>
                  </Radio.Group>
                )}
              </Modal>
            </div>
          </div>
          <div>Всего средств: {totalMoney} руб. </div>
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            style={{ width: "6vw" }}
            danger
            type="primary"
            onClick={logOut}
          >
            Выйти
          </Button>
        </div>
      </BaseCard>
    </StyledContainer>
  );
};

export default Profile;

const StyledBaseCard = styled(BaseCard)`
  /* margin-left: 10px;
  margin-right: 10px; */
  margin-top: 10px;
  padding: 0;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #140139;
  color: #fff;
  padding: 10px;
  padding-right: 25px;
`;

const StyledSpan = styled.span`
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  color: transparent;
`;
