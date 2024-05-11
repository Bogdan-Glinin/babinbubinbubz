import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Tooltip,
} from "antd";
import moment from "moment";
import BaseCard from "../../../Shared/ui/base-card";
import styled from "styled-components";
import { useState } from "react";
import EChartsReact from "echarts-for-react";
import {
  GetUserCardsDocument,
  useGetUserCardsQuery,
} from "../../../Entities/cards/queries/get-user-cards.gen";
import { useCreateUserCardMutation } from "../../../Entities/cards/mutations/create-user-card.gen";
import { useGetUserTransactionsForChartsQuery } from "../../../Entities/user-transactions/queries/get-user-transactions-for-charts.gen";

const RecommendationsCard = () => {
  const [isAddCardMoadlOpen, setIsAddCardMoadlOpen] = useState(false);
  const [addCardName, setAddCardName] = useState("");
  const [addCardBalance, setAddCardBalance] = useState<any>(null);
  const [addCardIsCredit, setAddCardIsCredit] = useState(false);
  const [addCardInterestRate, setAddCardInterestRate] = useState<any>(null);
  const [addCardLimit, setAddCardLimit] = useState<any>(null);
  const [addCardDischargeDate, setAddCardDischargeDate] = useState<any>();

  const { data: userCards } = useGetUserCardsQuery();
  const [createCard, {}] = useCreateUserCardMutation();
  const { data: transactionsForCharts } =
    useGetUserTransactionsForChartsQuery();

  const staticsticExpenseoption = {
    title: {
      text: "Расходы по месяцам",
    },
    legend: {
      data: ["Расходы"],
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: false },
        saveAsImage: { show: true },
      },
    },
    calculable: false,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: transactionsForCharts?.transactionForChart?.expense?.map((e: any) => e.date),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Расходы",
        type: "bar",
        data: transactionsForCharts?.transactionForChart?.expense?.map(
          (e: any) => e.value
        ),
      },
    ],
  };

  const staticsticIncomeOption = {
    title: {
      text: "Доходы по месяцам",
    },
    legend: {
      data: ["Расходы"],
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: false },
        saveAsImage: { show: true },
      },
    },
    calculable: false,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: transactionsForCharts?.transactionForChart?.income?.map((e: any) => e.date),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Доходы",
        type: "bar",
        data: transactionsForCharts?.transactionForChart?.income?.map(
          (e: any) => e.value
        ),
      },
    ],
  };

  const closeAddCardModal = () => {
    setIsAddCardMoadlOpen(false);
    setAddCardStateNull();
  };

  const setAddCardStateNull = () => {
    setAddCardName("");
    setAddCardBalance(null);
    setAddCardIsCredit(false);
    setAddCardInterestRate(null);
    setAddCardLimit(null);
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
          interesrate: +addCardInterestRate.toFixed(2),
          iscredit: addCardIsCredit,
          limit: +addCardLimit.toFixed(2),
        },
      },
      refetchQueries: [
        {
          query: GetUserCardsDocument,
        },
      ],
    });
    closeAddCardModal();
  };

  return (
    <Card>
      <Title>Статистика и советы</Title>
      <div>
        <div style={{ fontWeight: 600, fontSize: 20 }}>Ваши счета</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {userCards &&
            userCards?.userCards?.map((e) => (
              <div
                style={{
                  padding: 10,
                  borderRadius: 15,
                  border: "1px solid #6b6b6b",
                  margin: 10,
                }}
              >
                <div>{e?.name}</div>
                <div>{e?.balance} руб.</div>
              </div>
            ))}
          <div>
            <Tooltip title="Добавить счет">
              <Button
                onClick={() => setIsAddCardMoadlOpen(!isAddCardMoadlOpen)}
              >
                <PlusOutlined />
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
                  />
                  <div>Кредитный лимит</div>
                  <InputNumber
                    precision={2}
                    style={{ width: "100%" }}
                    value={addCardLimit}
                    onChange={(e) => setAddCardLimit(e)}
                  />
                  <div>Дата выписки</div>
                  <DatePicker
                    format={"DD.MM"}
                    style={{ width: "100%" }}
                    value={addCardDischargeDate}
                    onChange={(e) => {
                      console.log(moment(e).format("DD.MM.YYYY"));
                      setAddCardDischargeDate(e);
                    }}
                  />
                </>
              )}
            </Modal>
          </div>
        </div>
      </div>
      {/* <div>
            {totalExpense > totalIncome ? (
              <div>
                <WarningOutlined style={{ color: "red" }} /> Ваши расходы
                превышают доходы
              </div>
            ) : (
              <div>Ваш финансовый баланс в норме</div>
            )}
          </div> */}
      <div>
        <EChartsReact option={staticsticExpenseoption} />
      </div>
      <div>
        <EChartsReact option={staticsticIncomeOption} />
      </div>
    </Card>
  );
};

export default RecommendationsCard;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;

const StyledBaseCard = styled(BaseCard)`
  margin: 10px;
`;

const Card = styled(StyledBaseCard)`
  /* grid-column: span 3; */
  grid-row: span 3;
`;
