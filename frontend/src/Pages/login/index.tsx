import { Button, Input } from "antd";
import { useState } from "react";
import { styled } from "styled-components";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const onSignChange = () => setIsSignIn(!isSignIn);

  return (
    <StyledContainer>
      {isSignIn ? (
        <>
          <SyledTitle>Вход в систему</SyledTitle>
          <div>Номер телефона:</div>
          <StyledInput />
          <div>Пароль:</div>
          <StyledInput type="password" />
          <Button
            style={{ width: "100%", marginTop: "2vh", height: "40px" }}
            type="primary"
          >
            Войти
          </Button>
          <StyledSingUp>
            <div>Еще нет в системе?</div>
            <Button type="link" onClick={onSignChange}>
              Зарегистрироваться
            </Button>
          </StyledSingUp>
        </>
      ) : (
        <>
          <SyledTitle>Регистрация</SyledTitle>
          <div>Номер телефона:</div>
          <StyledInput />
          <div>Пароль:</div>
          <StyledInput type="password" />
          <div>Повторите пароль:</div>
          <StyledInput type="password" />
          <Button
            style={{ width: "100%", marginTop: "2vh", height: "40px" }}
            type="primary"
          >
            Зарегистрироваться
          </Button>
          <StyledSingUp>
            <div>Уже есть аккаунт?</div>
            <Button type="link" onClick={onSignChange}>
              Войти
            </Button>
          </StyledSingUp>
        </>
      )}
    </StyledContainer>
  );
};

export default Login;

const StyledContainer = styled.div`
  width: 300px;
  height: 350px;
  border-radius: 20px;
  padding: 50px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SyledTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 3vh;
`;

const StyledInput = styled(Input)`
  margin-bottom: 3vh;
`;

const StyledSingUp = styled.div`
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
