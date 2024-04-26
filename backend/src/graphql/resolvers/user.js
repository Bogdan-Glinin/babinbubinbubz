const pool = require("../../db");

const userResolver = {
  AllUsers: async () => {
    try {
      const query = "SELECT * FROM users"; // Запрос к базе данных
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  User: async ({ id }) => {
    try {
      const query = `SELECT * FROM users WHERE id = $1`; // Запрос к базе данных с параметром
      const { rows } = await pool.query(query, [id]);
      return rows[0]; // Возвращаем первую найденную запись
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  createUser: async ({ userData }) => {
    try {
      const { username, age } = userData;
      const query =
        "INSERT INTO users (username, age) VALUES ($1, $2) RETURNING *"; // Запрос на добавление пользователя
      const { rows } = await pool.query(query, [username, age]);
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = userResolver