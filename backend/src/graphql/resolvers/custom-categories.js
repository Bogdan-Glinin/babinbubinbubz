const jwt = require("jsonwebtoken");
const pool = require("../../db");

const key = "e4po4mack";

const customCategoriesResolver = {
  userCustomCategories: async ({}, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const query = "SELECT * FROM customcategories WHERE userid = $1";
      const { rows } = await pool.query(query, [token.id]);
      return rows;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  createCustomCategory: async ({ categoryData }, context) => {
    try {
      const token = jwt.verify(
        context.authorization.replace("Bearer ", ""),
        key
      );
      const { name, type, icon } = categoryData;
      const query =
        "INSERT INTO customcategories (name, type, icon, userid) VALUES ($1, $2, $3, $4) RETURNING id";
      const { rows } = await pool.query(query, [name, type, icon, token.id]);
      return rows[0].id;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};

module.exports = customCategoriesResolver;
