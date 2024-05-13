import { Button, Input, message } from "antd";
import styled from "styled-components";
import { useGetUserTokenLazyQuery } from "../../../Entities/users/queries/get-user-token.gen";
import { useEffect, useState } from "react";
import { encryptData } from "../../../Shared/config/crypto";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface SignInProps {
  onSignChange: () => void;
}

const SignIn = ({ onSignChange }: SignInProps) => {
  const [getUserToken, { data, error }] = useGetUserTokenLazyQuery();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const setCurrentUser = () => {
    setIsButtonDisabled(true);
    getUserToken({
      variables: {
        phoneNumber: login,
        password: encryptData(password),
      },
    }).then(() => setIsButtonDisabled(false));
  };

  const formatPhoneNumber = (phoneNumber: any) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "+7 (" + match[2] + ") " + match[3] + "-" + match[4];
    }
    return phoneNumber;
  };

  useEffect(() => {
    if (error) {
      message.error("Неверный логин или пароль");
    }
    if (data?.token) {
      Cookies.set("token", data?.token);
    }
  }, [data, error]);

  if (data?.token) {
    return <Navigate to="/main" replace />;
  }

  return (
    <StyledContainer>
      <SyledTitle>Вход в систему</SyledTitle>
      <div>Номер телефона:</div>
      <StyledInput
        value={login}
        onChange={(e) => setLogin(formatPhoneNumber(e.target.value))}
      />
      <div>Пароль:</div>
      <StyledInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={setCurrentUser}
        style={{ width: "100%", marginTop: "2vh", height: "40px" }}
        type="primary"
        disabled={isButtonDisabled}
      >
        Войти
      </Button>
      <StyledSingUp>
        <div>Еще нет в системе?</div>
        <Button type="link" onClick={onSignChange}>
          Зарегистрироваться
        </Button>
      </StyledSingUp>
    </StyledContainer>
  );
};

export default SignIn;

const StyledContainer = styled.div`
  width: 300px;
  height: 300px;
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
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const StyledSingUp = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
