import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Radio,
  Tooltip,
} from "antd";
import moment from "moment";
import BaseCard from "../../../Shared/ui/base-card";
import styled from "styled-components";
import { useEffect, useState } from "react";
import EChartsReact from "echarts-for-react";
import {
  GetUserCardsDocument,
  useGetUserCardsQuery,
} from "../../../Entities/cards/queries/get-user-cards.gen";
import { useCreateUserCardMutation } from "../../../Entities/cards/mutations/create-user-card.gen";
import {
  useGetUserTransactionsForChartsLazyQuery,
  useGetUserTransactionsForChartsQuery,
} from "../../../Entities/user-transactions/queries/get-user-transactions-for-charts.gen";
import { theme } from "../../../Shared/config/themes";

const RecommendationsCard = ({transactionChartDateType, setTransactionChartDateType}: any) => {
  const [isAddCardMoadlOpen, setIsAddCardMoadlOpen] = useState(false);
  const [addCardName, setAddCardName] = useState("");
  const [addCardBalance, setAddCardBalance] = useState<any>(0.0);
  const [addCardIsCredit, setAddCardIsCredit] = useState(false);
  const [addCardInterestRate, setAddCardInterestRate] = useState<any>(0.0);
  const [addCardLimit, setAddCardLimit] = useState<any>(0.0);
  const [addCardDischargeDate, setAddCardDischargeDate] = useState<any>();
  const [minPayment, setMinPayment] = useState<any>(0.0);

  const { data: userCards } = useGetUserCardsQuery();
  const [createCard, {}] = useCreateUserCardMutation();
  const [getTransactionsForChart, { data: transactionsForCharts }] =
    useGetUserTransactionsForChartsLazyQuery();

  const staticsticExpenseoption = {
    title: {
      text: "Расходы",
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
        type: "bar",
        data: transactionsForCharts?.transactionForChart?.expense?.map(
          (e: any) => e.value.toFixed(2)
        ),
      },
    ],
  };

  const staticsticIncomeOption = {
    title: {
      text: "Доходы",
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
          (e: any) => e.value.toFixed(2)
        ),
      },
    ],
  };

  useEffect(() => {
    if (transactionChartDateType) {
      getTransactionsForChart({
        variables: {
          dataType: transactionChartDateType,
        },
      });
    }
  }, [transactionChartDateType]);

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
    });
    closeAddCardModal();
  };

  return (
    <Card>
      <Title>Статистика</Title>
      <div>
        <div style={{ fontWeight: 600, fontSize: 20 }}>Ваши счета</div>
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
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
                <div>{e?.balance?.toFixed(2)} руб.</div>
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
                addonAfter={"₽"}
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
      <div style={{ fontWeight: 600, fontSize: 20 }}>
        Ваши расходы и доходы
      </div>
      <Radio.Group
        defaultValue={transactionChartDateType}
        onChange={(e) => setTransactionChartDateType(e.target.value)}
        style={{marginBottom: "1vh", marginTop: "1vh"}}
      >
        <Radio.Button value={"days"}>По дням</Radio.Button>
        <Radio.Button value={"month"}>По месяцам</Radio.Button>
        <Radio.Button value={"years"}>По годам</Radio.Button>
      </Radio.Group>
      <div>
        <EChartsReact theme={theme} option={staticsticExpenseoption} />
      </div>
      <div>
        <EChartsReact theme={theme} option={staticsticIncomeOption} />
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
  /* margin: 10px; */
  margin-top: 2vh;
  min-height: 127vh;
  max-height: 140vh;
`;

const Card = styled(StyledBaseCard)`
  /* grid-column: span 3; */
  grid-row: span 3;
`;
