import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useGetIsUserCompleteOnboardingQuery } from "../../../Entities/onboarding/queries/is-user-complete-onboarding.gen";
import moment from "moment";
import styled from "styled-components";
import { AlertOutlined, WarningOutlined } from "@ant-design/icons";
import { useCompliteOnboadringUserMutation } from "../../../Entities/onboarding/mutations/complite-user-onboarding.gen";
import { GetUserCardsDocument } from "../../../Entities/cards/queries/get-user-cards.gen";

const Onboarding = () => {
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("base");
  const [cardName, setCardName] = useState("");
  const [cardBalance, setCardBalance] = useState<any>(0);
  //   const [isCredit, setIsCredit] = useState(false);
  //   const [selectedDate, setSelectedDate] = useState<any>(null);
  //   const [creditLimit, setCreditLimit] = useState(0);
  //   const [interestRate, setInterestRate] = useState(0);
  //   const [balance, setbalance] = useState(0);
  //   const [FreePeriod, setFreePeriod] = useState(0);

  const { data: userData, loading: userDataLoading } =
    useGetIsUserCompleteOnboardingQuery();

  const [compiteOnboarding, { data }] = useCompliteOnboadringUserMutation();

  const compliteOnboarding = () => {
    compiteOnboarding({
      variables: {
        data: {
          cardBalance,
          cardName,
          subscriptionType,
        },
      },
      refetchQueries: [
        {
          query: GetUserCardsDocument,
        },
      ],
    });
    setIsOnboardingModalOpen(false);
  };

  //   const handleDateChange = (date: any, dateString: any) => {
  //     setSelectedDate({
  //       date: date,
  //       dateString: dateString,
  //     });
  //   };

  useEffect(() => {
    if (userData?.user) {
      setIsOnboardingModalOpen(!userData?.user.isonboardingcomplete);
    }
  }, [userData]);

  const options = [
    {
      value: "base",
      label: "Базовая",
    },
    {
      value: "premium",
      label: "Премиум",
    },
  ];
  return (
    <Modal
      title={"Заполните необходимую информацию"}
      open={isOnboardingModalOpen}
      closable={false}
      footer={[
        <Button type="primary" key="save" onClick={compliteOnboarding}>
          Сохранить
        </Button>,
      ]}
    >
      <div>Тип подписки:</div>
      <StyledSelect
        options={options}
        defaultValue={subscriptionType}
        onChange={(value: any) => setSubscriptionType(value)}
      />
      <div>
        <AlertOutlined />
        Добавьте счет как минимум один счет
      </div>
      <div>Название: </div>
      <StyledInput
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <div>Баланс: </div>
      <StyledInputNumber
        precision={2}
        value={cardBalance}
        onChange={(e) => setCardBalance(e)}
        addonAfter={"₽"}
      />
    </Modal>
  );
};

export default Onboarding;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;
