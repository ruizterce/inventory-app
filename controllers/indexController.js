const db = require("../db/queries");

module.exports = {
  get: async function (req, res) {
    try {
      const categories = await db.getCategories();
      const products = await db.getAllProducts();
      res.render("index", { categories: categories, products: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
