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

  getProductById: async (productId) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM products WHERE product_id = ${productId}`
      );
      return rows[0];
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new Error("Could not retrieve products. Please try again later.");
    }
  },

  getCategories: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM categories");
      return rows;
    } catch (error) {
      console.error("Error retrieving categories:", error);
      throw new Error("Could not retrieve categories. Please try again later.");
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

  getBrands: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM brands");
      return rows;
    } catch (error) {
      console.error("Error retrieving brands:", error);
      throw new Error("Could not retrieve brands. Please try again later.");
    }
  },

  getProductsByBrandId: async (brandId) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM Products p WHERE brand_id = ${brandId}`
      );
      return rows;
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new Error("Could not retrieve products. Please try again later.");
    }
  },
};
