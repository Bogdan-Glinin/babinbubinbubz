import BaseCard from "./../../Shared/ui/base-card";
import styled from "styled-components";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Select,
  Spin,
  Tooltip,
} from "antd";
import {
  AreaChartOutlined,
  CameraOutlined,
  CloudOutlined,
  DeleteOutlined,
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
import {
  GetUserCardsDocument,
  useGetUserCardsQuery,
} from "../../Entities/cards/queries/get-user-cards.gen";
import { useCreateUserCardMutation } from "../../Entities/cards/mutations/create-user-card.gen";
import { useDeleteUserCardMutation } from "../../Entities/cards/mutations/delete-user-card.gen";
import { useDeteleUserCategeryMutation } from "../../Entities/profile/mutations/delete-custom-category.gen";
import { useUpdateUserMutation } from "../../Entities/profile/mutations/update-user.gen";

const Profile = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const [addCategoryName, setAddCategoryName] = useState("");
  const [addCategotyType, setAddCategoryType] = useState("expense");
  const [addCategoryExpenseIcon, setAddCategoryExpenseIcon] = useState("");
  const [addCategoryIncomeIcon, setAddCategoryIncomeIcon] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isAddCardMoadlOpen, setIsAddCardMoadlOpen] = useState(false);
  const [addCardName, setAddCardName] = useState("");
  const [addCardBalance, setAddCardBalance] = useState<any>(0.0);
  const [addCardIsCredit, setAddCardIsCredit] = useState(false);
  const [addCardInterestRate, setAddCardInterestRate] = useState<any>(0.0);
  const [addCardLimit, setAddCardLimit] = useState<any>(0.0);
  const [addCardDischargeDate, setAddCardDischargeDate] = useState<any>();
  const [minPayment, setMinPayment] = useState<any>(0.0);

  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  const [login, setLogin] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [subsctiptionType, setSubscriptionType] = useState<any>("");

  const changeIsUpdateUserModalOpen = () => {
    setIsUpdateUserModalOpen(!isUpdateUserModalOpen);
  };

  const options = [
    {
      label: "Базовая",
      value: "base",
    },
    {
      label: "Премиум",
      value: "premium",
    },
  ];

  const { data: userCards } = useGetUserCardsQuery();
  const { data: userData, loading: userDataLoading } = useGetUserDataQuery();
  const [createCustomCategory, {}] = useAddCustomCategoryMutation();
  const [createCard, {}] = useCreateUserCardMutation();
  const [deleteCard, {}] = useDeleteUserCardMutation();
  const [deleteCategory, {}] = useDeteleUserCategeryMutation();
  const [updateUser, {}] = useUpdateUserMutation();

  const updateUserProfile = () => {
    updateUser({
      variables: {
        userData: {
          name,
          phoneNumber: login,
          subscriptiontype: subsctiptionType,
          isonboardingcomplete: null,
          password: null,
          subscriptionExpirationDate: null,
        },
      },
      refetchQueries: [
        {
          query: GetUserDataDocument,
        },
      ],
    }).then(() => message.success("Ваши данные обновлены"));
    changeIsUpdateUserModalOpen();
  };

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
      }).then(() => message.success("Ваша категория добавлена"));
      setAddCategoryModal();
      setAddCategoryStateNull();
    } catch (error) {
      if (error instanceof ValidationError) {
        error.errors.map((e) => message.error(e));
      }
    }
  };

  const deleteUserCard = (cardId: any) => {
    deleteCard({
      variables: {
        cardId,
      },
      refetchQueries: [
        {
          query: GetUserCardsDocument,
        },
      ],
    }).then(() => message.success("Ваша карта и ее транзакции удалены"));
  };

  const deleteUserCategory = (categoryId: any, categoryName: any) => {
    deleteCategory({
      variables: {
        categoryId,
        categoryName,
      },
      refetchQueries: [
        {
          query: GetUserDataDocument,
        },
      ],
    }).then(() => message.success("Ваша категория удалена"));
  };

  const closeAddCardModal = () => {
    setIsAddCardMoadlOpen(false);
    setAddCardStateNull();
  };

  const setAddCardStateNull = () => {
    setAddCardName("");
    setAddCardBalance(0.0);
    setAddCardIsCredit(false);
    setAddCardInterestRate(0.0);
    setAddCardLimit(0.0);
    setAddCardDischargeDate(null);
  };

  const createUserCard = () => {
    createCard({
      variables: {
        //@ts-ignore
        cardData: {
          name: addCardName,
          balance: +addCardBalance.toFixed(2),
          dischargedate: addCardDischargeDate,
          interestrate: +addCardInterestRate.toFixed(2),
          iscredit: addCardIsCredit,
          limit: +addCardLimit.toFixed(2),
          minpayment: +minPayment.toFixed(2),
        },
      },
      refetchQueries: [
        {
          query: GetUserCardsDocument,
        },
      ],
    }).then(() => message.success("Ваша карта добавлена"));
    closeAddCardModal();
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

  const formatPhoneNumber = (phoneNumber: any) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "+7 (" + match[2] + ") " + match[3] + "-" + match[4];
    }
    return phoneNumber;
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
    if (userData?.user) {
      setName(userData?.user?.name);
      setLogin(userData?.user?.phonenumber);
      setSubscriptionType(userData?.user?.subscriptiontype);
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
            <div style={{ width: window.innerWidth > 769 ? 700 : 100 }}>
              {window.innerWidth > 769 && (
                <StyledSpan>Бабынбубынбуз Аналитикс</StyledSpan>
              )}
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
        <div style={{ marginTop: "2vh" }}>
          <div>Имя: {userData?.user?.name}</div>
          <div style={{ marginTop: "2vh" }}>
            Номер: {userData?.user?.phonenumber}
          </div>
          <div style={{ marginTop: "2vh" }}>
            Тип подписки:{" "}
            {userData?.user?.subscriptiontype === "base"
              ? "Базовая"
              : "Премиум"}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: "1vh",
            }}
          >
            Дополнительные категории:
            {userData?.userCustomCategories?.length ? (
              userData?.userCustomCategories.map((e: any) => (
                <div
                  style={{
                    padding: "1vh",
                    borderRadius: "1vh",
                    border: "1px solid #6b6b6b",
                    marginRight: "1vh",
                    display: "flex",
                    marginTop: window.innerWidth > 769 ? 0 : 5,
                  }}
                >
                  <div>{getCardIcon(e.icon)}</div>
                  <div>
                    <div>{e.type === "expense" ? "Расход" : "Доход"}</div>
                    <div>{e.name}</div>
                  </div>
                  <Tooltip title={`Удалить ${e?.name}`}>
                    <Button
                      type="text"
                      onClick={() => deleteUserCategory(e?.id, e?.name)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
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
          <div>
            {/* <div style={{ fontWeight: 600, fontSize: 20 }}></div> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              Ваши счета:
              {userCards &&
                userCards?.userCards?.map((e) => (
                  <div
                    style={{
                      padding: "1vh",
                      borderRadius: "1vh",
                      border: "1px solid #6b6b6b",
                      marginRight: "1vh",
                      display: "flex",
                      marginTop: window.innerWidth > 769 ? 0 : 5,
                    }}
                  >
                    <div>
                      <div>{e?.name}</div>
                      <div>{e?.balance?.toFixed(2)} руб.</div>
                    </div>
                    <Tooltip title={`Удалить ${e?.name}`}>
                      <Button type="text" onClick={() => deleteUserCard(e?.id)}>
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>
                  </div>
                ))}
              <div>
                <Tooltip title="Добавить счет">
                  <Button
                    onClick={() => setIsAddCardMoadlOpen(!isAddCardMoadlOpen)}
                    type="text"
                  >
                    <PlusSquareOutlined style={{ fontSize: 18 }} />
                  </Button>
                </Tooltip>
                <Modal
                  open={isAddCardMoadlOpen}
                  title="Добавление счета"
                  onOk={createUserCard}
                  onCancel={closeAddCardModal}
                >
                  <div>Название: </div>
                  <Input
                    value={addCardName}
                    onChange={(e) => setAddCardName(e.target.value)}
                  />
                  <div>Баланс: </div>
                  <InputNumber
                    style={{ width: "100%" }}
                    value={addCardBalance}
                    onChange={(e) => setAddCardBalance(e)}
                    precision={2}
                    addonAfter={"₽"}
                  />
                  <div>Кредитная</div>
                  <Checkbox
                    checked={addCardIsCredit}
                    onChange={(e) => setAddCardIsCredit(e.target.checked)}
                  >
                    {addCardIsCredit ? "Да" : "Нет"}
                  </Checkbox>
                  {addCardIsCredit && (
                    <>
                      <div>Процентная ставка(годовых)</div>
                      <InputNumber
                        style={{ width: "100%" }}
                        value={addCardInterestRate}
                        onChange={(e) => setAddCardInterestRate(e)}
                        precision={2}
                        addonAfter={"%"}
                      />
                      <div>Процент минимального платежа</div>
                      <InputNumber
                        style={{ width: "100%" }}
                        value={minPayment}
                        onChange={(e) => setMinPayment(e)}
                        precision={2}
                        addonAfter={"%"}
                      />
                      <div>Кредитный лимит</div>
                      <InputNumber
                        precision={2}
                        style={{ width: "100%" }}
                        value={addCardLimit}
                        onChange={(e) => setAddCardLimit(e)}
                        addonAfter={"₽"}
                      />
                      <div>Дата выписки</div>
                      <DatePicker
                        format={"DD.MM"}
                        style={{ width: "100%" }}
                        value={addCardDischargeDate}
                        onChange={(e) => {
                          setAddCardDischargeDate(e);
                        }}
                      />
                    </>
                  )}
                </Modal>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "2vh" }}>
            Всего средств: {totalMoney.toFixed(2)} руб.{" "}
          </div>
        </div>
        <div style={{ marginTop: "2vh" }}>
          <Button onClick={changeIsUpdateUserModalOpen}>
            Редактировать профиль
          </Button>
          <Modal
            open={isUpdateUserModalOpen}
            onCancel={changeIsUpdateUserModalOpen}
            onOk={updateUserProfile}
            title="Редактирование профиля"
          >
            <div>Имя: </div>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <div>Номер телефона: </div>
            <Input
              value={login}
              onChange={(e) => setLogin(formatPhoneNumber(e.target.value))}
            />
            <div>Тип подписки: </div>
            <Select
              style={{ width: "100%" }}
              options={options}
              value={subsctiptionType}
              disabled={subsctiptionType === "premium"}
            />
          </Modal>
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            style={{ width: window.innerWidth > 769 ? '6vw' : '20vw', }}
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
