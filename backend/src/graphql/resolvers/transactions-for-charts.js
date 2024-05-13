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

const getExpensesByDays = (data) => {
  const expensesByMonth = [];

  data.map((e) => {
    if (e.type === "expense") {
      const date = moment(e.date, "DD.MM.YYYY HH:mm").format("DD.MM.YYYY");
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

const getIncomesByYears = (data) => {
  const incomesByMonth = [];

  data.map((e) => {
    if (e.type === "income") {
      const date = moment(e.date, "DD.MM.YYYY HH:mm").format("YYYY");
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
const getExpensesByYears = (data) => {
  const expensesByMonth = [];

  data.map((e) => {
    if (e.type === "expense") {
      const date = moment(e.date, "DD.MM.YYYY HH:mm").format("YYYY");
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

const getIncomesByDays = (data) => {
  const incomesByMonth = [];

  data.map((e) => {
    if (e.type === "income") {
      const date = moment(e.date, "DD.MM.YYYY HH:mm").format("DD.MM.YYYY");
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
  transactionForChart: async ({ dataType }, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query = "SELECT * FROM transactions WHERE userId = $1";
      const { rows } = await pool.query(query, [token.id]);

      let expense;
      let income;

      switch (dataType) {
        case "days":
          expense = getExpensesByDays(rows);
          income = getIncomesByDays(rows);
          break;
        case "month":
          expense = getExpensesByMonth(rows);
          income = getIncomesByMonth(rows);
          break;
        case "years":
          expense = getExpensesByYears(rows);
          income = getIncomesByYears(rows);
          break;
      }

      return { expense, income };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = transactionsForChartResolver;
