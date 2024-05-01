const jwt = require("jsonwebtoken");
const pool = require("../../db");
const {encryptData, decryptData} = require('../../crypto')

const key = "e4po4mack";

const tokenResolver = {
  token: async ({ phoneNumber, password }) => {
    try {
      const query =
        "SELECT * FROM users WHERE phoneNumber = $1 AND password = $2";
      const { rows } = await pool.query(query, [phoneNumber, password]);
      console.log(rows)
      return jwt.sign({ id: rows[0].id }, key);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
};

module.exports = tokenResolver;
