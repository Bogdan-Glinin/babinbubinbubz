const pool = require("../../db");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {encryptData, decryptData} = require('../../crypto')

const key = "e4po4mack";

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
  user: async ({}, context) => {
    try {
      const token = jwt.verify(context.authorization.replace("Bearer ", ""), key)
      const query = `SELECT * FROM users WHERE id = $1`; // Запрос к базе данных с параметром
      const { rows } = await pool.query(query, [token.id]);
      console.log(rows)
      return rows[0]; // Возвращаем первую найденную запись
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  createUser: async ({ userData }) => {
    try {
      const { name, phoneNumber, password } = userData;
      const query =
        "INSERT INTO users (name, phonenumber, password) VALUES ($1, $2, $3) RETURNING id";
      const { rows } = await pool.query(query, [name, phoneNumber, password]);
      return jwt.sign({ id: rows[0].id }, key);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  onboardingUser: async ({ userData }) => {
    try {
      const token = authorizationHeader.replace("Bearer ", "")
      const { subscriptionType, subscriptionExpirationDate } = userData;
      const query =
        "UPDATE users SET (subscriptionType, subscriptionExpirationDate) VALUES ($1, $2) WHERE id=$3 RETURNING id";
      const { rows } = await pool.query(query, [subscriptionType, subscriptionExpirationDate, token]);
      return "User comptlite onboarding";
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = userResolver;
