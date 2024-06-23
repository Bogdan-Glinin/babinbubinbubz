import styled from "styled-components";
import BaseCard from "../../Shared/ui/base-card";
import StyledContainer from "../../Shared/ui/container";
import logo from "/dashboard-images/logo.png";
import { Button, Collapse, Spin, Tooltip } from "antd";
import {
  FrownOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useGetUerCreditCardsQuery } from "../../Entities/credit/queries/get-user-credit-cards.gen";
import { Children, useEffect } from "react";
import { useGetCreditCardIncomesLazyQuery } from "../../Entities/credit/queries/get-credit-card-incomes.gen";
import CreditCard from "../../Features/credit-card/ui";
import { useGetUserRecomendationsQuery } from "../../Entities/recomendations/queries/get-user-recomendations.gen";
import StyledContainerWithHTML from "../../Shared/ui/container-with-HTML";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

const Credit = () => {
  const { data: userCreditCardsData, loading: userCreditCardsLoading } =
    useGetUerCreditCardsQuery();
  const [
    getCreditCardIncomesData,
    { data: creditCardIncomesData, loading: creditCardIncomesLoading },
  ] = useGetCreditCardIncomesLazyQuery();

  const { data: recomendations, loading } = useGetUserRecomendationsQuery();

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

  if (userCreditCardsLoading || creditCardIncomesLoading || loading) {
    return <Spin size="large" />;
  }

  return (
    <StyledContainer>
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
          ) : userCreditCardsData?.userCreditCards?.length ? (
            userCreditCardsData?.userCreditCards?.map((e: any) => {
              return (
                <CreditCard
                  element={e}
                  creditCardIncomesData={creditCardIncomesData}
                />
              );
            })
          ) : (
            <BaseCard
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "92%",
              }}
            >
              У вас нет кредитов и это прекрасно
            </BaseCard>
          )}
        </AnalyticsBlock>
        <RecomendationBlock>
          <div style={{ fontSize: 24, fontWeight: 600, marginBottom: "2vh" }}>
            Полезные статьи
          </div>
          <Collapse>
            {recomendations?.recomendations
              ?.slice()
              .reverse()
              .map((e) => (
                <CollapsePanel
                  header={e?.title ? e?.title : ""}
                  key={e?.title ? e?.title : ""}
                >
                  <StyledContainerWithHTML data={e?.content} />
                </CollapsePanel>
              ))}
          </Collapse>
        </RecomendationBlock>
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
  display: ${window.innerWidth > 769 ? "grid" : "flex"};
  flex-direction: column;
  grid-template-columns: 2fr 1fr; /* Первый блок занимает 2/3, второй - 1/3 */
  grid-template-rows: 100%;
  gap: 1vh;
  margin-top: 1vh;
`;
