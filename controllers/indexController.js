const db = require("../db/queries");

module.exports = {
  get: async function (req, res) {
    try {
      const products = await db.getAllProducts();
      console.log(products);
      res.render("index", { products: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
