import { Input, InputNumber, Modal, Radio, Select } from "antd";
import { expenseOptions, incomeOptions } from "../lib/get-modal-options";

const TransactionModal = ({
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
}: any) => {

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
            setType(e.target.value)
            setCategory('')
            setName('')
        }}
      >
        <Radio.Button value="expense">Расход</Radio.Button>
        <Radio.Button value="income">Доход</Radio.Button>
      </Radio.Group>
      <div>Категория: </div>
      <Select
        style={{ width: "100%" }}
        value={transactionCategory}
        onChange={(e) => setCategory(e)}
        options={transactionType === "expense" ? expenseOptions : incomeOptions}
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
