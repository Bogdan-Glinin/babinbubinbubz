import { Input, InputNumber, Modal, Radio, Select, Spin } from "antd";
import { getExpenseOptions, getIncomeOptions } from "../lib/get-modal-options";
import { useGetUserCustomCategoriesQuery } from "../../../Entities/transaction-modal/queries/get-user-custom-categories.gen";
import { useEffect, useState } from "react";

const TransactionModal = ({
  customCategories,
  isModalOpen,
  action,
  closeModal,
  transactionType,
  setType,
  transactionCategory,
  setCategory,
  setName,
  transactionAmount,
  setAmount,
  transactionName,
  selectCardOptions,
  card,
  setCard,
  disabled,
}: any) => {
  const [incomeCustomCategories, setIncomeCustomCategory] = useState<any>(null);
  const [expenseCustomCategories, setExpenseCustomCategory] =
    useState<any>(null);

  useEffect(() => {
    let income: any = [];
    let expense: any = [];
    if (customCategories?.userCustomCategories) {
      customCategories?.userCustomCategories?.map((e: any) => {
        if (e?.type === "expense") {
          expense.push({
            value: e?.name,
            label: e?.name,
          });
        } else {
          income.push({
            value: e?.name,
            label: e?.name,
          });
        }
      });
      income.length === 0
        ? setIncomeCustomCategory(null)
        : setIncomeCustomCategory(income);
      expense.length === 0
        ? setExpenseCustomCategory(null)
        : setExpenseCustomCategory(expense);
    }
  }, [customCategories]);
  return (
    <Modal
      open={isModalOpen}
      onOk={action}
      onCancel={closeModal}
      title="Добавление транзакции"
    >
      <div>Тип операции: </div>
      <Radio.Group
        value={transactionType}
        onChange={(e) => {
          setType(e.target.value);
          setCategory("");
          setName("");
        }}
      >
        <Radio.Button disabled={disabled} value="expense">
          Расход
        </Radio.Button>
        <Radio.Button disabled={disabled} value="income">
          Доход
        </Radio.Button>
      </Radio.Group>
      <div>Категория: </div>
      <Select
        style={{ width: "100%" }}
        value={transactionCategory}
        onChange={(e) => setCategory(e)}
        options={
          transactionType === "expense"
            ? getExpenseOptions(expenseCustomCategories)
            : getIncomeOptions(incomeCustomCategories)
        }
      />
      {transactionType === "expense" ? (
        <div>Счет списания: </div>
      ) : (
        <div>Счет начисления: </div>
      )}
      <Select
        disabled={disabled}
        style={{ width: "100%" }}
        options={selectCardOptions}
        value={card}
        onChange={(e) => setCard(e)}
      />

      {transactionType === "expense" && (
        <>
          {" "}
          <div>Название: </div>
          <Input
            value={transactionName}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </>
      )}

      <div>Сумма: </div>
      <InputNumber
        value={transactionAmount}
        onChange={(e) => setAmount(e)}
        style={{ width: "100%" }}
        addonAfter={"₽"}
      />
    </Modal>
  );
};

export default TransactionModal;
