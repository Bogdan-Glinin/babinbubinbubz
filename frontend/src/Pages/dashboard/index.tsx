import { Button } from "antd";
import BaseCard from "../../Shared/ui/base-card";
import StyledContainer from "../../Shared/ui/container";
import styled from "styled-components";
import expense from "/dashboard-images/expense.png";
import income from "/dashboard-images/income.png";
import list from "/dashboard-images/list.png";

const Dashboard = () => {
  return (
    <>
      <StyledContainer>
        <BaseCard>
          <Header>
            <div>Лого с названием</div>
            <Button href="/login" type="primary" style={{ width: 200 }}>
              Попробовать
            </Button>
          </Header>
          <div style={{ width: 700 }}>
            <span style={{ fontWeight: 700 }}>Бабынбубынбуз Аналитикс</span>
          </div>
          <Advantages>
            <Title>Преимущества</Title>
            <div>
              Удобное представление доходов и расходов в виде графиков, таблиц и
              списков
            </div>
            <ImageConatiner>
              <img src={expense} style={{maxWidth: '30vw'}}/>
              <img src={income} style={{maxWidth: '30vw'}}/>
              <img src={list} style={{maxWidth: '30vw'}}/>
            </ImageConatiner>
          </Advantages>
        </BaseCard>
      </StyledContainer>
    </>
  );
};

export default Dashboard;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;

const ImageConatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Advantages = styled.div`
  margin-top: 20px;
`;
