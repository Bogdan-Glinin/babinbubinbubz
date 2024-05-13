import {
  CarOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { useUpdateUserTransactionMutation } from "../../../Entities/user-transactions/mutations/update-user-transaction.gen";
import { GetUserTransactionsDocument } from "../../../Entities/user-transactions/queries/get-user-transations.gen";
import TransactionModal from "../../transaction-modal/ui";
import { getCardIcon } from "../lib/get-card-icon";
import { getCategoryIcon } from "../../transaction-modal/lib/get-category-icon";
import { useUpdateUserCardMutation } from "../../../Entities/cards/mutations/update-user-card.gen";
import { GetUserCardsDocument } from "../../../Entities/cards/queries/get-user-cards.gen";
import moment from "moment";

interface ExpenseProps {
  category: string | null;
  icon: string | null;
  name: string | null;
  date: string | null;
  amount: number | null;
  deleteTransaction: (cardid: string | null) => void;
  type: string | null;
  id: string | null;
  cardid: string | null;
  selectCardOptions: any;
  transactionCardData: any;
  customCategories: any
}

const ExpenseCard = ({
  customCategories,
  category,
  deleteTransaction,
  icon,
  name,
  date,
  amount,
  type,
  id,
  cardid,
  selectCardOptions,
  transactionCardData,
}: ExpenseProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setType] = useState(type);
  const [transactionCategory, setCategory] = useState(category);
  const [transactionName, setName] = useState(name);
  const [transactionAmount, setAmount] = useState(amount);
  const [transactionCard, setCard] = useState(cardid);

  const [updateTransaction, {}] = useUpdateUserTransactionMutation();
  const [updateCard, {}] = useUpdateUserCardMutation();

  const updateUserTransaction = () => {
    updateTransaction({
      variables: {
        transactionData: {
          amount: transactionAmount ? transactionAmount : 0,
          type: transactionType ? transactionType : "",
          category: transactionCategory ? transactionCategory : "",
          date: date ? date : "",
          icon: getCategoryIcon(transactionCategory, customCategories?.userCustomCategories),
          id: id ? id : "",
          name: transactionName ? transactionName : "",
          cardid: cardid ? cardid : "",
        },
      },
      refetchQueries: [
        {
          query: GetUserTransactionsDocument,
        },
      ],
    });
    updateCard({
      variables: {
        cardData: {
          name: transactionCardData.name,
          balance:
            transactionCardData.balance +
            amount -
            (transactionAmount ? transactionAmount : 0),
          dischargedate: transactionCardData.dischargedate,
          id: transactionCardData.id,
          interestrate: transactionCardData.interesrate,
          iscredit: transactionCardData.iscredit,
          limit: transactionCardData.limit,
          minpayment: transactionCardData.minpayment,
        },
      },
      refetchQueries: [
        {
          query: GetUserCardsDocument,
        },
      ],
    });
    setIsModalOpen(false);
  };

  const setStateNull = () => {
    setType(type);
    setCategory(category);
    setName(name);
    setAmount(amount);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #6b6b6b",
        borderRadius: "20px",
        marginBottom: "2vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          {getCardIcon(icon)}
        </div>
        <div style={{ width: 190 }}>
          <div style={{ fontWeight: 600, marginBottom: "1vh" }}>{category}</div>
          <div>{name}</div>
          <div>{date}</div>
          <div>
            {transactionCardData.name} -{amount ? amount.toString() : 0} руб
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "10vh" }}>
        <Tooltip title="Удалить">
          <Button type="text" onClick={() => deleteTransaction(cardid)}>
          <DeleteOutlined style={{ fontSize: 24 }} />
          </Button>
        </Tooltip>
        <Tooltip title="Изменить">
          <Button
            onClick={() => {
              setIsModalOpen(true), setStateNull();
            }}
            type="text"
          >
            <EditOutlined style={{ fontSize: 24 }} />
          </Button>
        </Tooltip>
      </div>
      <TransactionModal
       customCategories={customCategories}
        isModalOpen={isModalOpen}
        action={updateUserTransaction}
        closeModal={closeModal}
        transactionType={transactionType}
        setType={setType}
        transactionCategory={transactionCategory}
        setCategory={setCategory}
        setName={setName}
        transactionAmount={transactionAmount}
        setAmount={setAmount}
        transactionName={transactionName}
        card={transactionCard}
        setCard={setCard}
        selectCardOptions={selectCardOptions}
        disabled={true}
      />
    </div>
  );
};

export default ExpenseCard;
