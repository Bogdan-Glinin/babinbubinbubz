import { Carousel, Tooltip } from "antd";
import EChartsReact from "echarts-for-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BaseCard from "../../../Shared/ui/base-card";
import "./style.css";
import { theme } from "../../../Shared/config/themes";

const ChartCard = ({ userTransactions, userCards }: any) => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);

  const expenseOption = {
    tooltip:
      window.innerWidth > 769
        ? {
            trigger: "item",
          }
        : {
            trigger: "item",
            position: "bottom",
          },
    legend:
      window.innerWidth > 769
        ? {
            top: "5%",
            left: "center",
          }
        : {
            bottom: "0%",
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
            show: window.innerWidth > 769 ? true : false,
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
      },
    ],
  };

  const incomeOptions = {
    tooltip:
      window.innerWidth > 769
        ? {
            trigger: "item",
          }
        : {
            trigger: "item",
            position: "bottom",
          },
    legend:
      window.innerWidth > 769
        ? {
            top: "5%",
            left: "center",
          }
        : {
            bottom: "0%",
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
            show: window.innerWidth > 769 ? true : false,
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
              if (curr.type === "income") {
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
      },
    ],
  };

  useEffect(() => {
    let totalExpense = 0;
    let totalIncome = 0;
    let totalMoney = 0;
    if (expenseOption?.series[0]?.data) {
      expenseOption.series[0].data.map((e: any) => (totalExpense += e.value));
      setTotalExpense(totalExpense);
    }
    if (incomeOptions?.series[0]?.data) {
      incomeOptions.series[0].data.map((e: any) => (totalIncome += e.value));
      setTotalIncome(totalIncome);
    }
    if (totalMoneyOption?.series[0]?.data) {
      totalMoneyOption.series[0].data.map((e: any) => (totalMoney += e.value));
      setTotalMoney(totalMoney);
    }
  }, [expenseOption, incomeOptions, totalMoney]);

  const totalMoneyOption = {
    tooltip:
      window.innerWidth > 769
        ? {
            trigger: "item",
          }
        : {
            trigger: "item",
            position: "bottom",
          },
    legend:
      window.innerWidth > 769
        ? {
            top: "5%",
            left: "center",
          }
        : {
            bottom: "0%",
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
            show: window.innerWidth > 769 ? true : false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: userCards?.userCards
          ? userCards?.userCards?.map((e: any) => {
              return {
                name: e?.name,
                value: e?.balance,
              };
            })
          : [],
      },
    ],
  };

  return (
    <Card style={{ gridRow: "span 1", gridColumn: "span 1" }}>
      <Carousel
        style={{
          width: window.innerWidth > 769 ? "33vw" : "100%",
          height: "100%",
        }}
        arrows
      >
        <div style={{ height: "100%" }}>
          <Title>График расходов</Title>
          <EChartsReact theme={theme} option={expenseOption} />
          <div style={{ marginBottom: "2vh" }}>
            Всего расходов:{" "}
            <span style={{ fontWeight: 700 }}>{totalExpense.toFixed(2)}</span>Р
          </div>
        </div>
        <div>
          <Title>График доходов</Title>
          <EChartsReact theme={theme} option={incomeOptions} />
          <div style={{ marginBottom: "2vh" }}>
            Всего доходов:{" "}
            <span style={{ fontWeight: 700 }}>{totalIncome.toFixed(2)}</span>Р
          </div>
        </div>
        <div>
          <Title>График средств</Title>
          <EChartsReact theme={theme} option={totalMoneyOption} />
          <div style={{ marginBottom: "2vh" }}>
            Всего средств <Tooltip title="Без учета кредиток">*</Tooltip> :{" "}
            <span style={{ fontWeight: 700 }}>{totalMoney.toFixed(2)}</span>Р
          </div>
        </div>
      </Carousel>
    </Card>
  );
};

export default ChartCard;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;

const StyledBaseCard = styled(BaseCard)`
  margin: 2vh;
`;

const Card = styled(StyledBaseCard)`
  /* grid-row: span 1;
  grid-column: span 1;  */
  /* height: 40vh; */
`;
