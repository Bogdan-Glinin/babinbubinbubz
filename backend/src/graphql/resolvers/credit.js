const jwt = require("jsonwebtoken");
const pool = require("../../db");
const moment = require("moment");

const key = "e4po4mack";

const creditCardsResolver = {
  userCreditCards: async ({}, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query = "SELECT * FROM cards WHERE userId = $1 AND iscredit = true";
      const { rows } = await pool.query(query, [token.id]);
      return rows;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  allCreditCardIncome: async ({ cardIds }, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query =
        "SELECT * FROM transactions WHERE userid=$1 AND cardid=ANY($2) AND type='income'";
      const { rows } = await pool.query(query, [token.id, cardIds]);
      const result = rows.reduce((acc, transaction) => {
        const { cardid, date, amount } = transaction;
        const day = moment(date).format("DD.MM.YYYY");
        const currentMonth = moment().format('YYYY-MM');
        const dayMonth = moment(day).format('YYYY-MM');
      
        // Проверяем, есть ли уже запись для этой карты и дня
        const existingCard = acc.find(card => card.cardId === cardid);
        if (existingCard) {
          const existingDay = existingCard.cardIncomes.find(dayObj => dayObj.date === day);
          if (existingDay && dayMonth === currentMonth) {
            existingDay.amount += +amount;
          } else if (dayMonth === currentMonth) {
            existingCard.cardIncomes.push({ date: day, amount: +amount });
          }
        } else if (dayMonth === currentMonth) {
            acc.push({ cardId: cardid, cardIncomes: [{ date: day, amount: +amount }] });
        }
      
        return acc;
      }, []);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = creditCardsResolver;
