const jwt = require("jsonwebtoken");
const pool = require("../../db");
const moment = require("moment");

const key = "e4po4mack";

const getExpensesByMonth = (data) => {
  const expensesByMonth = [];

  data.map((e) => {
    if (e.type === "expense") {
      const date = moment(e.date, "DD.MM.YYYY HH:mm").format("MM.YYYY");
      const isExistIndex = expensesByMonth.findIndex(
        (item) => item.date === date
      );

      if (isExistIndex !== -1) {
        expensesByMonth[isExistIndex].value += +e.amount;
      } else {
        expensesByMonth.push({ value: +e.amount, date });
      }
    }
  });

  return expensesByMonth;
};

const getIncomesByMonth = (data) => {
  const incomesByMonth = [];

  data.map((e) => {
    if (e.type === "income") {
      const date = moment(e.date, "DD.MM.YYYY HH:mm").format("MM.YYYY");
      const isExistIndex = incomesByMonth.findIndex(
        (item) => item.date === date
      );

      if (isExistIndex !== -1) {
        incomesByMonth[isExistIndex].value += +e.amount;
      } else {
        incomesByMonth.push({ value: +e.amount, date });
      }
    }
  });

  return incomesByMonth;
};

const transactionsForChartResolver = {
  transactionForChart: async ({}, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query = "SELECT * FROM transactions WHERE userId = $1";
      const { rows } = await pool.query(query, [token.id]);

      const expense = getExpensesByMonth(rows);
      const income = getIncomesByMonth(rows);

      console.log(expense)

      return { expense: expense.reverse(), income: income.reverse() };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = transactionsForChartResolver;
