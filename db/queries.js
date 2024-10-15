const pool = require("./pool");

module.exports = {
  getAllProducts: async () => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM products ORDER BY product_id"
      );
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
      throw new Error("Could not retrieve product. Please try again later.");
    }
  },

  getCategories: async () => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM categories ORDER BY category_id"
      );
      return rows;
    } catch (error) {
      console.error("Error retrieving categories:", error);
      throw new Error("Could not retrieve categories. Please try again later.");
    }
  },

  getCategoryById: async (categoryId) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM categories WHERE category_id = ${categoryId}`
      );
      return rows[0];
    } catch (error) {
      console.error("Error retrieving category:", error);
      throw new Error("Could not retrieve category. Please try again later.");
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

  addCategory: async (name, desc) => {
    try {
      await pool.query(
        `INSERT INTO Categories (name, description) VALUES
        ('${name}', '${desc}')
        ON CONFLICT (name) DO NOTHING;`
      );
      return;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Could not create category. Please try again later.");
    }
  },

  updateCategory: async (id, name, desc) => {
    try {
      await pool.query(
        `UPDATE categories
        SET name = '${name}', description = '${desc}'
        WHERE category_id = ${id};`
      );
      return;
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Could not update category. Please try again later.");
    }
  },

  getBrands: async () => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM brands ORDER BY brand_id"
      );
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
