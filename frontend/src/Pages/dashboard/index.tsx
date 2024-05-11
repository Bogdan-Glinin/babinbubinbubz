import { Button } from "antd";
import BaseCard from "../../Shared/ui/base-card";
import StyledContainer from "../../Shared/ui/container";
import styled from "styled-components";
import logo from "/dashboard-images/logo.png";
import EChartsReact from "echarts-for-react";

const Dashboard = () => {
  const expenseOption = {
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   top: "5%",
    //   left: "center",
    // },
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
        data: [
          { value: 500, name: "Транспорт" },
          { value: 1500, name: "Одежда и обувь" },
          { value: 750, name: "Кафе и рестораны" },
          { value: 1500, name: "Здоровье" },
        ],
      },
    ],
  };

  const incomeOption = {
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   top: "5%",
    //   left: "center",
    // },
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
        data: [
          { value: 5000, name: "Премия" },
          { value: 15000, name: "Зарплата" },
        ],
      },
    ],
  };
  return (
    <>
      <StyledContainer>
        <StyledBaseCard>
          <Header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={logo} width={100} alt="" />
              <div style={{ width: 700 }}>
                <StyledSpan>Бабынбубынбуз Аналитикс</StyledSpan>
              </div>
            </div>
            <Button href="/login" type="primary" style={{ width: 200 }}>
              Попробовать
            </Button>
          </Header>
        </StyledBaseCard>
        <BaseCard style={{ marginTop: 10 }}>
          <Advantages>
            <Title>Управляйте своими финансами</Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              <EChartsReact
                option={expenseOption}
                style={{ height: 500, width: 500 }}
              />
              <div style={{ marginLeft: 50, fontSize: 24 }}>
                Контролируйте свои финансы с помощью удобных графиков, списков{" "}
                <br />
                Вы можете добавлять все свои операции в систему, которая
                расчитает все за Вас!
              </div>
            </div>
          </Advantages>
        </BaseCard>
        <BaseCard style={{ marginTop: 10 }}>
          <Title>Кастомизируйте систему</Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: 50, fontSize: 24 }}>
              Для удобства Вы можете добавлять собственные категории для
              расходов и доходов
            </div>
            <EChartsReact
              option={incomeOption}
              style={{ height: 500, width: 500 }}
            />
          </div>
        </BaseCard>
        <BaseCard style={{ marginTop: 10 }}>
          <Title>Избавьтесь от кредитов и кредиток</Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: 50, fontSize: 24 }}>Писька</div>
            <EChartsReact
              option={incomeOption}
              style={{ height: 500, width: 500 }}
            />
          </div>
        </BaseCard>
        <BaseCard style={{ marginTop: 10 }}>
          <Title>Подберите идеальный план для себя</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "4vh",
            }}
          >
            <PriceCard>
              <CardTitle>Базовый</CardTitle>
              <div>
                <div>Особенности:</div>
                <div>2 дополнительные категории на расходы</div>
                <div>1 дополнительная категория на доходы</div>
                <div>Анализ ваших доходов и расходов</div>
              </div>
              <div>
                Бесплатно
              </div>
            </PriceCard>
            <PriceCard>
              <CardTitle>Продвинутый</CardTitle>
              <div>
                <div>Особенности:</div>
                <div>Анализ ваших доходов и расходов</div>
                <div>Любое количество дополнительных категорий на все</div>
                <div>Помощь в закрытии одной кредитной карты</div>
              </div>
              <div>
                500 руб.
              </div>
            </PriceCard>
            <PriceCard>
              <CardTitle>Премиум</CardTitle>
              <div>
                <div>Особенности:</div>
                <div>Анализ ваших доходов и расходов</div>
                <div>Любое количество дополнительных категорий на все</div>
                <div>Помощь в закрытии всех кредитов</div>
                <div>Рекомендации по управлению бюджетом</div>
              </div>
              <div>
                1200 руб.
              </div>
            </PriceCard>
          </div>
        </BaseCard>
      </StyledContainer>
    </>
  );
};

export default Dashboard;

const StyledBaseCard = styled(BaseCard)`
  padding: 0;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-left: 13vh;
  text-decoration: underline;
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

const Advantages = styled.div`
  margin-top: 20px;
`;

const StyledSpan = styled.span`
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  color: transparent;
`;

const PriceCard = styled.div`
  background: linear-gradient(135deg, #FFA500, #6112e0);
  padding: 10px;
  border-radius: 10px;
  color: #f4f4f4;
  width: 400px;
  font-size: 18px;
`

const CardTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-decoration: underline;
`