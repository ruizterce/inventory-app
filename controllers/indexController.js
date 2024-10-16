const db = require("../db/queries");

module.exports = {
  get: async function (req, res) {
    try {
      const categories = await db.getCategories();
      const brands = await db.getBrands();
      const products = await db.getAllProducts();
      res.render("index", {
        categories: categories,
        brands: brands,
        products: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
