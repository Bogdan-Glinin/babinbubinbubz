import { Button, Spin, Tooltip } from "antd";
import styled from "styled-components";
import { useGetUserCardsQuery } from "../../Entities/cards/queries/get-user-cards.gen";
import Onboarding from "../../Features/onboarding/ui";
import ChartCard from "../../Features/chart-card/ui";
import RecommendationsCard from "../../Features/recomendation-card/ui";
import TransactionCard from "../../Features/transaction-card/ui";
import { useGetUserTransactionsQuery } from "../../Entities/user-transactions/queries/get-user-transations.gen";
import BaseCard from "../../Shared/ui/base-card";
import logo from "/dashboard-images/logo.png";
import { UserOutlined } from "@ant-design/icons";

const Main = () => {
  const { data: userTransactions, loading } = useGetUserTransactionsQuery();
  const { data: userCards, loading: cardsLoading } = useGetUserCardsQuery();

  if (loading || cardsLoading) {
    return (
      <div style={{ width: "100vh", height: "100vh" }}>
        <StyledSpin size="large" />
      </div>
    );
  }

  return (
    <>
      <StyledBaseCard>
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} width={100} alt="" />
            <div style={{ width: 700 }}>
              <StyledSpan>Бабынбубынбуз Аналитикс</StyledSpan>
            </div>
          </div>
          <Tooltip title="Профиль">
            <Button type="text" style={{ marginRight: "1vw" }} href="/profile">
              <UserOutlined style={{ fontSize: 32, color: "#fff" }} />
            </Button>
          </Tooltip>
        </Header>
      </StyledBaseCard>
      <Onboarding />
      <Container>
        <ChartCard userTransactions={userTransactions} userCards={userCards} />
        <RecommendationsCard />
        <TransactionCard />
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  grid-template-rows: 1fr 2fr;
  height: 100%;
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

const StyledSpin = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledBaseCard = styled(BaseCard)`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 0;
  overflow: hidden;
`;

const StyledSpan = styled.span`
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  color: transparent;
`;
