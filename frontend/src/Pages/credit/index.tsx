import styled from "styled-components";
import BaseCard from "../../Shared/ui/base-card";
import StyledContainer from "../../Shared/ui/container";
import logo from "/dashboard-images/logo.png";
import { Button, Spin, Tooltip } from "antd";
import {
  FrownOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useGetUerCreditCardsQuery } from "../../Entities/credit/queries/get-user-credit-cards.gen";
import { useEffect } from "react";
import { useGetCreditCardIncomesLazyQuery } from "../../Entities/credit/queries/get-credit-card-incomes.gen";
import CreditCard from "../../Features/credit-card/ui";

const Credit = () => {
  const { data: userCreditCardsData, loading: userCreditCardsLoading } =
    useGetUerCreditCardsQuery();
  const [
    getCreditCardIncomesData,
    { data: creditCardIncomesData, loading: creditCardIncomesLoading },
  ] = useGetCreditCardIncomesLazyQuery();

  useEffect(() => {
    if (userCreditCardsData?.userCreditCards) {
      const cardIds: any[] = [];
      userCreditCardsData?.userCreditCards.map((e: any) => {
        cardIds.push(e.id);
      });
      getCreditCardIncomesData({
        variables: {
          cardIds,
        },
      });
    }
  }, [userCreditCardsData]);

  if (userCreditCardsLoading || creditCardIncomesLoading) {
    return <Spin size="large" />;
  }

  return (
    <StyledContainer>
      <StyledBaseCard>
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} width={100} alt="" />
            <div style={{ width: 700 }}>
              <StyledSpan>Бабынбубынбуз Аналитикс</StyledSpan>
            </div>
          </div>
          <div>
            <Tooltip title="Финансы">
              <Button type="text" href="/main">
                <PieChartOutlined style={{ fontSize: 32, color: "#fff" }} />
              </Button>
            </Tooltip>
            <Tooltip title="Профиль">
              <Button
                type="text"
                style={{ marginRight: "1vw" }}
                href="/profile"
              >
                <UserOutlined style={{ fontSize: 32, color: "#fff" }} />
              </Button>
            </Tooltip>
          </div>
        </Header>
      </StyledBaseCard>
      <MainBlock>
        <AnalyticsBlock>
          {userCreditCardsData?.user?.subscriptiontype === "base" &&
          userCreditCardsData?.userCreditCards ? (
            <>
              <CreditCard
                element={userCreditCardsData?.userCreditCards[0]}
                creditCardIncomesData={creditCardIncomesData}
              />
              <BaseCard
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <div>На этом все </div>
                  <FrownOutlined style={{ fontSize: "24px" }} />
                </div>
                <div>
                  Для получения полного доступа необходима подписка "Премиум"
                </div>
              </BaseCard>
            </>
          ) : userCreditCardsData?.userCreditCards ? (
            userCreditCardsData?.userCreditCards?.map((e: any) => {
              return (
                <CreditCard
                  element={e}
                  creditCardIncomesData={creditCardIncomesData}
                />
              );
            })
          ) : (
            ""
          )}
        </AnalyticsBlock>
        <RecomendationBlock>Рекомендации</RecomendationBlock>
      </MainBlock>
    </StyledContainer>
  );
};

export default Credit;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #140139;
  color: #fff;
  padding: 10px;
  padding-right: 25px;
`;

const StyledBaseCard = styled(BaseCard)`
  /* margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px; */
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

const AnalyticsBlock = styled.div`
  grid-area: 1 / 1 / 2 / 2;
`;
const RecomendationBlock = styled(BaseCard)`
  grid-area: 1 / 2 / 2 / 3;
`;

const MainBlock = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Первый блок занимает 2/3, второй - 1/3 */
  grid-template-rows: 100%;
  gap: 1vh;
  margin-top: 1vh;
`;
