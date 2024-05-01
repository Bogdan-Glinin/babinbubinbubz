import { Spin, Button, Tooltip } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment";
import BaseCard from "../../Shared/ui/base-card";
import EChartsReact from "echarts-for-react";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import IncomeCard from "../../Features/income-card/ui";
import ExpenseCard from "../../Features/expense-card/ui";
import {
  GetUserTransactionsDocument,
  useGetUserTransactionsQuery,
} from "../../Entities/user-transactions/queries/get-user-transations.gen";
import { useCreateUserTransactionMutation } from "../../Entities/user-transactions/mutations/create-user-transaction.gen";
import { useDeleteUserTransactionMutation } from "../../Entities/user-transactions/mutations/delete-user-transaction.gen";
import TransactionModal from "../../Features/transaction-modal/ui";
import { getCategoryIcon } from "../../Features/transaction-modal/lib/get-category-icon";

const Main = () => {
  // const [isModalOpen, setIsModalOpen] = useState(true);
  // const [subscriptionType, setSubscriptionType] = useState("pro");
  // const [isCredit, setIsCredit] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<any>(null);
  // const [creditLimit, setCreditLimit] = useState(0);
  // const [interestRate, setInterestRate] = useState(0);
  // const [balance, setbalance] = useState(0);
  // const [FreePeriod, setFreePeriod] = useState(0);

  // const { data: userData, loading: userDataLoading } =
  //   useGetIsUserCompleteOnboardingQuery();

  // const compliteOnboarding = () => {
  //   const percent =
  //     ((creditLimit - balance) * (100 / interestRate)) /
  //     (365 * (moment().diff(moment(selectedDate.dateString), "days") + 1));
  //   console.log(percent);
  //   setIsModalOpen(false);
  // };

  // const handleDateChange = (date: any, dateString: any) => {
  //   setSelectedDate({
  //     date: date,
  //     dateString: dateString,
  //   });
  // };

  // useEffect(() => {
  //   if (userData?.user) {
  //     setIsModalOpen(!userData?.user.isOnboardingComplete);
  //   }
  // }, [userData]);

  // if (userDataLoading) {
  //   return <StyledSpin size="large" />;
  // }

  // const options = [
  //   {
  //     value: "base",
  //     label: "Базовая",
  //   },
  //   {
  //     value: "pro",
  //     label: "Про",
  //   },
  //   {
  //     value: "premium",
  //     label: "Премиум",
  //   },
  // ];

  {
    /* <Modal
        title={"Заполните необходимую информацию"}
        open={isModalOpen}
        closable={false}
        footer={[
          <Button type="primary" key="save" onClick={compliteOnboarding}>
            Сохранить
          </Button>,
        ]}
      >
        <div>Тип подписки:</div>
        <StyledSelect
          options={options}
          defaultValue={subscriptionType}
          onChange={(value: any) => setSubscriptionType(value)}
        />
        {subscriptionType === "premium" && (
          <>
            <div>Есть ли у вас кредитная карта?</div>
            <StyledCheckox
              value={isCredit}
              onChange={(e: any) => setIsCredit(e.target.checked)}
            >
              Да
            </StyledCheckox>
            {isCredit && (
              <>
                <div>Укажаите кредитный лимит</div>
                <StyledInputNumber
                  value={creditLimit}
                  onChange={(e: any) => setCreditLimit(e)}
                  addonAfter={"₽"}
                />
                <div>Укажаите годовую проентную ставку</div>
                <StyledInputNumber
                  value={interestRate}
                  onChange={(e: any) => setInterestRate(e)}
                  addonAfter={"%"}
                />
                <div>Укажаите текущее количество денежных средств на карте</div>
                <StyledInputNumber
                  value={balance}
                  onChange={(e: any) => setbalance(e)}
                  addonAfter={"₽"}
                />
                <div>Укажаите беспроцентный период(в днях)</div>
                <StyledInputNumber
                  value={FreePeriod}
                  onChange={(e: any) => setFreePeriod(e)}
                />
                <div>Укажаите дату выписки</div>
                <StyledDatePicker
                  onChange={handleDateChange}
                  value={selectedDate ? selectedDate.date : null}
                />
              </>
            )}
          </>
        )}
      </Modal> */
  }

  const { data: userTransactions, loading } = useGetUserTransactionsQuery();
  const [createTransaction, {}] = useCreateUserTransactionMutation();
  const [deleteTransaction, {}] = useDeleteUserTransactionMutation();

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: userTransactions?.userTransactions
          ? //@ts-ignore
            userTransactions?.userTransactions.reduce((acc, curr) => {
              //@ts-ignore
              if (curr.type === "expense") {
                //@ts-ignore
                const existingCategory = acc.find(
                  //@ts-ignore
                  (item) => item?.name === curr?.category
                );
                if (existingCategory) {
                  //@ts-ignore
                  existingCategory.value += curr.amount;
                } else {
                  //@ts-ignore
                  acc.push({ name: curr.category, value: curr.amount });
                }
              }
              return acc;
            }, [])
          : [],
        // [
        //   { value: 1048, name: "Транспорт" },
        //   { value: 735, name: "Рестораны и кафе" },
        //   { value: 580, name: "Продукты" },
        //   { value: 484, name: "Путешествия" },
        //   { value: 300, name: "Красота и здоровье" },
        // ],
      },
    ],
  };

  const [totalExpense, setTotalExpense] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const setStateNull = () => {
    setType("expense");
    setCategory("");
    setName("");
    setAmount(0);
  };

  const deleteUserTransaction = (id: string) => {
    deleteTransaction({
      variables: {
        transactionId: id,
      },
      refetchQueries: [
        {
          query: GetUserTransactionsDocument,
        },
      ],
    });
  };

  const createUserTransaction = () => {
    createTransaction({
      variables: {
        transactionData: {
          id: "",
          category,
          name,
          amount,
          type,
          icon: getCategoryIcon(category),
          date: moment().format("DD.MM.YYYY HH:mm"),
        },
      },
      refetchQueries: [
        {
          query: GetUserTransactionsDocument,
        },
      ],
    });
    setStateNull();
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setStateNull();
    setIsModalOpen(false);
  };

  useEffect(() => {
    let total = 0;
    if (option?.series[0]?.data) {
      option.series[0].data.map((e: any) => (total += e.value));
      setTotalExpense(total);
    }
  }, [option]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <div style={{ height: "75px" }}>Хэдер</div>
      <Container>
        <ChartCard style={{ gridRow: "span 1", gridColumn: "span 1" }}>
          <Title>График расходов</Title>
          <EChartsReact option={option} />
          <div>
            Всего расходов:{" "}
            <span style={{ fontWeight: 700 }}>{totalExpense}</span>Р
          </div>
        </ChartCard>
        <RecommendationsCard>
          <Title>Рекомендации</Title>
        </RecommendationsCard>
        <TransactionsCard>
          <Title style={{ marginBottom: "2vh" }}>Транзакции</Title>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Tooltip title="Добавить транзакцию">
              <Button onClick={() => setIsModalOpen(true)}>
                <PlusOutlined />
              </Button>
            </Tooltip>
          </div>
          <TransactionModal
            isModalOpen={isModalOpen}
            action={createUserTransaction}
            closeModal={closeModal}
            transactionType={type}
            setType={setType}
            transactionCategory={category}
            setCategory={setCategory}
            setName={setName}
            transactionAmount={amount}
            setAmount={setAmount}
            transactionName={name}
          />
          {userTransactions?.userTransactions?.length ? (
            userTransactions?.userTransactions?.map((e) => {
              if (e?.type === "expense") {
                return (
                  <ExpenseCard
                    category={e.category}
                    name={e.name}
                    icon={e.icon}
                    date={e.date}
                    type={e.type}
                    amount={e.amount}
                    deleteTransaction={() =>
                      deleteUserTransaction(e.id ? e.id : "")
                    }
                    id={e.id}
                  />
                );
              } else if (e?.type === "income") {
                return (
                  <IncomeCard
                    category={e.category}
                    name={e.name}
                    icon={e.icon}
                    date={e.date}
                    type={e.type}
                    amount={e.amount}
                    deleteTransaction={() =>
                      deleteUserTransaction(e.id ? e.id : "")
                    }
                    id={e.id}
                  />
                );
              }
            })
          ) : (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>Транзакции отсуствуют</div>
              <FrownOutlined style={{ fontSize: "32px" }} />
            </div>
          )}
        </TransactionsCard>
      </Container>
    </>
  );
};

export default Main;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;

const StyledBaseCard = styled(BaseCard)`
  margin: 10px;
`;

const ChartCard = styled(StyledBaseCard)`
  /* grid-row: span 1;
  grid-column: span 1;  */
`;

const RecommendationsCard = styled(StyledBaseCard)`
  /* grid-column: span 3; */
  grid-row: span 3;
`;

const TransactionsCard = styled(StyledBaseCard)`
  /* grid-column: span 2;  */
  position: relative;
  overflow-y: auto;
  height: 700px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  grid-template-rows: 1fr 2fr;
  height: 100%;
`;
// const StyledSpin = styled(Spin)`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

// const StyledSelect = styled(Select)`
//   width: 100%;
//   margin-bottom: 20px;
// `;

// const StyledCheckox = styled(Checkbox)`
//   margin-bottom: 20px;
// `;

// const StyledInputNumber = styled(InputNumber)`
//   margin-bottom: 20px;
//   width: 100%;
// `;

// const StyledDatePicker = styled(DatePicker)`
//   width: 100%;
//   margin-bottom: 20px;
// `;
