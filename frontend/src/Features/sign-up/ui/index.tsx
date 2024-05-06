import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { validationSchema } from "./../lib/validation";
import { ValidationError } from "yup";
import { useCreateUserMutation } from "../../../Entities/signUp/mutations/create-user.gen";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { encryptData } from "../../../Shared/config/crypto";

interface SignUpProps {
  onSignChange: () => void;
}

const SignUp = ({ onSignChange }: SignUpProps) => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);

  const [createUser, { data, error }] = useCreateUserMutation();
  
  useEffect(() => {
    if (data?.createUser) {
      Cookies.set("token", data?.createUser);
    }
  }, [data]);

  const onSignUp = () => {
    try {
      validationSchema.validateSync(
        {
          name,
          login,
          password,
          passwordRepeat,
        },
        { abortEarly: false }
      );
      createUser({
        variables: {
          userData: {
            name,
            phoneNumber: login,
            password: encryptData(password),
            isOnboardingComplete: false,
            subscriptionExpirationDate: "0",
            subscriptionType: "base",
          },
        },
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        error.errors.map((e) => message.error(e));
      }
    }
  };

  const formatPhoneNumber = (phoneNumber: any) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "+7 (" + match[2] + ") " + match[3] + "-" + match[4];
    }
    return phoneNumber;
  };

  if (data?.createUser) {
    return <Navigate to={"/main"} replace />;
  }

  return (
    <StyledContainer>
      <SyledTitle>Регистрация</SyledTitle>
      <div>Имя: </div>
      <StyledInput value={name} onChange={(e) => setName(e.target.value)} />
      <div>Номер телефона:</div>
      <StyledInput
        value={formatPhoneNumber(login)}
        onChange={(e) => setLogin(e.target.value)}
      />
      <div>Пароль:</div>
      <StyledPassword
        // status={passwordStatus}
        value={password}
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>Повторите пароль:</div>
      <StyledPassword
        // status={passwordStatus}
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
        visibilityToggle={{
          visible: passwordRepeatVisible,
          onVisibleChange: setPasswordRepeatVisible,
        }}
      />
      <Button
        style={{ width: "100%", marginTop: "2vh", height: "40px" }}
        type="primary"
        onClick={onSignUp}
      >
        Зарегистрироваться
      </Button>
      <StyledSingUp>
        <div>Уже есть аккаунт?</div>
        <Button type="link" onClick={onSignChange}>
          Войти
        </Button>
      </StyledSingUp>
    </StyledContainer>
  );
};

export default SignUp;

const StyledContainer = styled.div`
  width: 300px;
  height: 435px;
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

const StyledPassword = styled(Input.Password)`
  margin-bottom: 20px;
`;
