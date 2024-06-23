const jwt = require("jsonwebtoken");
const pool = require("../../db");

const key = "e4po4mack";

const recomendationsResolver = {
    recomendations: async ({}, context) => {
      try {
        const token = jwt.verify(
          context.authorization.replace("Bearer ", ""),
          key
        );
        const query = "SELECT * FROM recomendations";
        const { rows } = await pool.query(query);
        return rows;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    },
}

module.exports = recomendationsResolver