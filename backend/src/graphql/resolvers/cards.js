const jwt = require("jsonwebtoken");
const pool = require("../../db");

const key = "e4po4mack";

const cardsResolver = {
  userCards: async ({}, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query = "SELECT * FROM cards WHERE userId = $1";
      const { rows } = await pool.query(query, [token.id]);
      return rows;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  createCard: async ({ cardData }, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const {
        name,
        balance,
        iscredit,
        interestrate,
        limit,
        dischargedate,
        minpayment,
      } = cardData;
      const query =
        'INSERT INTO cards (userid, name, balance, iscredit, interestrate,  "limit", dischargedate, minpayment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
      const { rows } = await pool.query(query, [
        token.id,
        name,
        balance,
        iscredit,
        interestrate,
        limit,
        dischargedate,
        minpayment,
      ]);
      return rows[0].id;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  updateCard: async ({ cardData }) => {
    try {
      const {
        name,
        balance,
        iscredit,
        interestrate,
        limit,
        dischargedate,
        id,
      } = cardData;
      const query =
        'UPDATE cards SET name = $1, balance = $2, iscredit = $3, interestrate = $4, "limit" = $5, dischargedate = $6 WHERE id = $7 RETURNING id';
      const { rows } = await pool.query(query, [
        name,
        balance,
        iscredit,
        interestrate,
        limit,
        dischargedate,
        id,
      ]);
      return "Обновлено";
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  deleteCard: async ({ cardId }, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query = "DELETE FROM cards WHERE id = $1;";
      const secondQuery =
        "DELETE FROM transactions WHERE cardid=$1 AND userid=$2";
      const { rows } = await pool.query(query, [cardId]);
      const { rows: secondRows } = await pool.query(secondQuery, [
        cardId,
        token.id,
      ]);
      return "Карта удалена";
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = cardsResolver;
