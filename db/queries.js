const pool = require("./pool");

async function getAllProducts() {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw new Error("Could not retrieve products. Please try again later.");
  }
}

module.exports = {
  getAllProducts,
};
