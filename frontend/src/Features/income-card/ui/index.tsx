import {
  DollarOutlined,
  EditOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import {
  Button,
  Tooltip,
} from "antd";
import { GetUserTransactionsDocument } from "../../../Entities/user-transactions/queries/get-user-transations.gen";
import { useUpdateUserTransactionMutation } from "../../../Entities/user-transactions/mutations/update-user-transaction.gen";
import { useState } from "react";
import TransactionModal from "../../transaction-modal/ui";
import { getCardIcon } from "../../expense-card/lib/get-card-icon";
import { getCategoryIcon } from "../../transaction-modal/lib/get-category-icon";

interface IncomeProps {
  category: string | null;
  icon: string | null;
  name: string | null;
  date: string | null;
  amount: number | null;
  deleteTransaction: () => void;
  type: string | null;
  id: string | null;
}

const IncomeCard = ({
  category,
  deleteTransaction,
  icon,
  name,
  date,
  amount,
  type,
  id,
}: IncomeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setType] = useState(type);
  const [transactionCategory, setCategory] = useState(category);
  const [transactionName, setName] = useState(name);
  const [transactionAmount, setAmount] = useState(amount);

  const [updateTransaction, {}] = useUpdateUserTransactionMutation();

  const updateUserTransaction = () => {
    updateTransaction({
      variables: {
        transactionData: {
          amount: transactionAmount ? transactionAmount : 0,
          type: transactionType ? transactionType : "",
          category: transactionCategory ? transactionCategory : "",
          date: date ? date : "",
          icon: getCategoryIcon(transactionCategory),
          id: id ? id : "",
          name: transactionName ? transactionName : "",
        },
      },
      refetchQueries: [
        {
          query: GetUserTransactionsDocument,
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
          <div>{date}</div>
          <div>+{amount ? amount.toString() : 0} руб</div>
        </div>
      </div>
      <div style={{ marginLeft: "10vh" }}>
        <Tooltip title="Удалить">
          <Button type="text" onClick={deleteTransaction}>
            <MinusSquareOutlined style={{ fontSize: 24 }} />
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
      />
    </div>
  );
};

export default IncomeCard;
