import EChartsReact from "echarts-for-react";
import BaseCard from "../../../Shared/ui/base-card";
import styled from "styled-components";
import { theme } from "../../../Shared/config/themes";

const CreditCard = ({ element, creditCardIncomesData }: any) => {
  const getChartOption = (element: any) => {
    return {
      xAxis: {
        type: "category",
        data: element.length ? element.map((e: any) => e.date) : [],
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        trigger: "axis",
      },
      series: [
        {
          data: element.length ? element.map((e: any) => e.amount) : [],
          type: "bar",
        },
      ],
    };
  };

  const countPercents = (card: any) => {
    const percents =
      (((card.limit - card.balance) * (card.interestrate / 100)) / 365) * 30;
    return percents;
  };

  const countMinPay = (card: any) => {
    console.log(card.limit - card.balance);
    const minPay =
      (card.limit - card.balance) * (card.minpayment / 100) +
      countPercents(card);
    return minPay;
  };

  const chartCard = creditCardIncomesData?.allCreditCardIncome?.find(
    (cardIncome: any) => element.id === cardIncome?.cardId
  );
  const chartOptions = chartCard
    ? getChartOption(chartCard.cardIncomes)
    : getChartOption([]);
  return (
    <StyledBaseCard>
      <div style={{ fontSize: 24, fontWeight: 600 }}>{element.name}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "48vh",
        }}
      >
        <div>
          <div>
            Проценты по кредитной карте: <br />
            {countPercents(element).toFixed(2)} руб.
          </div>
          <div>
            Минимальный платеж составит: <br />
            {countMinPay(element).toFixed(2)} руб.
          </div>
        </div>
        <div style={{ width: "45vw" }}>
          <div style={{ width: "100%", textAlign: "center" }}>
            График платежей по кредитной карте
          </div>
          {chartCard?.cardIncomes?.length ? (
            <EChartsReact theme={theme} option={chartOptions} />
          ) : (
            <div style={{ textAlign: "center" }}>
              У вас нет платежей по данной карте(
            </div>
          )}
        </div>
      </div>
    </StyledBaseCard>
  );
};

export default CreditCard;

const StyledBaseCard = styled(BaseCard)`
  &:not(:last-child) {
    margin-bottom: 1vh;
  }
`;
