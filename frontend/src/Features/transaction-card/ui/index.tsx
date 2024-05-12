import styled from "styled-components";
import BaseCard from "../../../Shared/ui/base-card";
import { Button, Tooltip } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import TransactionModal from "../../transaction-modal/ui";
import ExpenseCard from "../../expense-card/ui";
import IncomeCard from "../../income-card/ui";
import { useState } from "react";
import {
  GetUserTransactionsDocument,
  useGetUserTransactionsQuery,
} from "../../../Entities/user-transactions/queries/get-user-transations.gen";
import { useCreateUserTransactionMutation } from "../../../Entities/user-transactions/mutations/create-user-transaction.gen";
import { useDeleteUserTransactionMutation } from "../../../Entities/user-transactions/mutations/delete-user-transaction.gen";
import { getCategoryIcon } from "../../transaction-modal/lib/get-category-icon";
import moment from "moment";
import { GetUserTransactionsForChartsDocument } from "../../../Entities/user-transactions/queries/get-user-transactions-for-charts.gen";
import {
  GetUserCardsDocument,
  useGetUserCardsQuery,
} from "../../../Entities/cards/queries/get-user-cards.gen";
import { useUpdateUserCardMutation } from "../../../Entities/cards/mutations/update-user-card.gen";

const TransactionCard = ({ transactionChartDateType }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [card, setCard] = useState("");

  const { data: userTransactions } = useGetUserTransactionsQuery();
  const [createTransaction, {}] = useCreateUserTransactionMutation();
  const [deleteTransaction, {}] = useDeleteUserTransactionMutation();
  const { data: userCards } = useGetUserCardsQuery();
  const [updateCard, {}] = useUpdateUserCardMutation();

  const setStateNull = () => {
    setType("expense");
    setCategory("");
    setName("");
    setAmount(0);
    setCard("");
  };

  const findCard = (data: any) => {
    return data.find((obj: any) => obj.id === card);
  };

  const findCardTransaction = (data: any, cardid: any) => {
    return data.find((obj: any) => obj.id === cardid);
  };
  const findTransaction = (data: any, id: any) => {
    return data.find((obj: any) => obj.id === id);
  };

  const createUserTransaction = () => {
    createTransaction({
      variables: {
        transactionData: {
          id: "",
          category,
          name,
          amount: +amount.toFixed(2),
          type,
          icon: getCategoryIcon(category),
          date: moment().format("DD.MM.YYYY HH:mm"),
          cardid: card ? card : "",
        },
      },
      refetchQueries: [
        {
          query: GetUserTransactionsDocument,
        },
        {
          query: GetUserTransactionsForChartsDocument,
          variables: {
            dataType: transactionChartDateType,
          },
        },
      ],
    });
    if (type === "expense") {
      const currentCard = findCard(userCards?.userCards);
      console.log(currentCard.iscredit);
      updateCard({
        variables: {
          cardData: {
            id: currentCard.id,
            balance: +currentCard.balance.toFixed(2) - +amount.toFixed(2),
            name: currentCard.name,
            dischargedate: currentCard.dischargedate,
            interestrate: currentCard.interestrate,
            iscredit: currentCard.iscredit,
            limit: currentCard.limit,
            minpayment: currentCard.minpayment,
          },
        },
        refetchQueries: [
          {
            query: GetUserCardsDocument,
          },
          {
            query: GetUserTransactionsForChartsDocument,
            variables: {
              dataType: transactionChartDateType,
            },
          },
        ],
      });
    } else {
      const currentCard = findCard(userCards?.userCards);
      updateCard({
        variables: {
          cardData: {
            id: currentCard.id,
            balance: +currentCard.balance.toFixed(2) + +amount.toFixed(2),
            name: currentCard.name,
            dischargedate: currentCard.dischargedate,
            interestrate: currentCard.interestrate,
            iscredit: currentCard.iscredit,
            limit: currentCard.limit,
            minpayment: currentCard.minpayment,
          },
        },
        refetchQueries: [
          {
            query: GetUserCardsDocument,
          },
        ],
      });
    }
    setStateNull();
    setIsModalOpen(false);
  };

  const deleteUserTransaction = (id: any, cardid: any) => {
    deleteTransaction({
      variables: {
        transactionId: id,
      },
      refetchQueries: [
        {
          query: GetUserTransactionsDocument,
        },
        {
          query: GetUserTransactionsForChartsDocument,
          variables: {
            dataType: transactionChartDateType,
          },
        },
      ],
    });
    const transactionCard = findCardTransaction(userCards?.userCards, cardid);
    const currentTransaction = findTransaction(
      userTransactions?.userTransactions,
      id
    );
    if (currentTransaction.type === "expense") {
      updateCard({
        variables: {
          cardData: {
            balance:
              +transactionCard.balance.toFixed(2) +
              +currentTransaction.amount.toFixed(2),
            id: transactionCard.id,
            dischargedate: transactionCard.dischargedate,
            interestrate: transactionCard.interestrate,
            iscredit: transactionCard.iscredit,
            limit: transactionCard.limit,
            name: transactionCard.name,
            minpayment: transactionCard.minpayment,
          },
        },
        refetchQueries: [
          {
            query: GetUserCardsDocument,
          },
        ],
      });
    } else {
      updateCard({
        variables: {
          cardData: {
            balance:
              transactionCard.balance.toFixed(2) -
              currentTransaction.amount.toFixed(2),
            id: transactionCard.id,
            dischargedate: transactionCard.dischargedate,
            interestrate: transactionCard.interestrate,
            iscredit: transactionCard.iscredit,
            limit: transactionCard.limit,
            name: transactionCard.name,
            minpayment: transactionCard.minpayment,
          },
        },
        refetchQueries: [
          {
            query: GetUserCardsDocument,
          },
        ],
      });
    }
  };

  const selectCardOptions = userCards?.userCards?.map((e) => ({
    value: e?.id,
    label: `${e?.name} (${e?.balance} руб.)`,
  }));

  const closeModal = () => {
    setStateNull();
    setIsModalOpen(false);
  };

  return (
    <Card>
      <Title style={{ marginBottom: "2vh" }}>Операции</Title>
      <AddTransactionButtonContainer>
        <Tooltip title="Добавить транзакцию">
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusOutlined />
          </Button>
        </Tooltip>
      </AddTransactionButtonContainer>
      <TransactionModal
        isModalOpen={isModalOpen}
        action={createUserTransaction}
        closeModal={closeModal}
        transactionType={type}
        setType={setType}
        transactionCategory={category}
        setCategory={setCategory}
        setName={setName}
        transactionAmount={amount}
        setAmount={setAmount}
        transactionName={name}
        selectCardOptions={selectCardOptions}
        card={card}
        setCard={setCard}
        disabled={false}
      />
      {userTransactions?.userTransactions?.length ? (
        userTransactions?.userTransactions?.map((e) => {
          if (e?.type === "expense") {
            return (
              <ExpenseCard
                category={e.category}
                name={e.name}
                icon={e.icon}
                date={e.date}
                type={e.type}
                amount={e.amount}
                cardid={e.cardid}
                deleteTransaction={(cardid) =>
                  deleteUserTransaction(e.id ? e.id : "", cardid)
                }
                id={e.id}
                selectCardOptions={selectCardOptions}
                transactionCardData={findCardTransaction(
                  userCards?.userCards,
                  e.cardid
                )}
              />
            );
          } else if (e?.type === "income") {
            return (
              <IncomeCard
                category={e.category}
                name={e.name}
                icon={e.icon}
                date={e.date}
                type={e.type}
                amount={e.amount}
                deleteTransaction={(cardid) =>
                  deleteUserTransaction(e.id ? e.id : "", cardid)
                }
                id={e.id}
                cardid={e.cardid}
                selectCardOptions={selectCardOptions}
                transactionCardData={findCardTransaction(
                  userCards?.userCards,
                  e.cardid
                )}
              />
            );
          }
        })
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>Операции отсуствуют</div>
          <FrownOutlined style={{ fontSize: "32px" }} />
        </div>
      )}
    </Card>
  );
};

export default TransactionCard;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;

const StyledBaseCard = styled(BaseCard)`
  margin-left: 2vh;
  margin-right: 2vh;
`;

const Card = styled(StyledBaseCard)`
  /* grid-column: span 2;  */
  height: 83vh;
  position: relative;
  overflow-y: auto;
`;

const AddTransactionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;
  /* z-index: 1;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%); */
`;
