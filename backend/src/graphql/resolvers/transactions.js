const jwt = require("jsonwebtoken");
const pool = require("../../db");

const key = "e4po4mack";

const transactionsResolver = {
  userTransactions: async ({}, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query = "SELECT * FROM transactions WHERE userId = $1";
      const { rows } = await pool.query(query, [token.id]);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  createTransaction: async ({ transactionData }, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const { category, name, type, amount, icon, date, cardid } =
        transactionData;
      const query =
        "INSERT INTO transactions (category, name, type, amount, icon, date, userid, cardid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id";
      const { rows } = await pool.query(query, [
        category,
        name,
        type,
        amount,
        icon,
        date,
        token.id,
        cardid,
      ]);
      return rows[0].id;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  deleteTransaction: async ({ transactionId }) => {
    try {
      console.log(transactionId);
      const query = "DELETE FROM transactions WHERE id=$1";
      const { rows } = await pool.query(query, [transactionId]);
      return "Удалено";
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  updateTransaction: async ({ transactionData }) => {
    try {
      const { category, name, type, amount, icon, id, cardid } =
        transactionData;
      const query =
        "UPDATE transactions SET category = $1, name = $2, type = $3, amount = $4, icon = $5, cardid = $6 WHERE id = $7 RETURNING id";
      const { rows } = await pool.query(query, [
        category,
        name,
        type,
        amount,
        icon,
        cardid,
        id,
      ]);
      return "Обновлено";
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = transactionsResolver;
