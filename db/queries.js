const pool = require("./pool");

module.exports = {
  getAllProducts: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM products");
      return rows;
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new Error("Could not retrieve products. Please try again later.");
    }
  },

  getProductsByCategoryId: async (categoryId) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM Products p WHERE category_id = ${categoryId}`
      );
      return rows;
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new Error("Could not retrieve products. Please try again later.");
    }
  },
};
