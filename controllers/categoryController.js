const db = require("../db/queries");

module.exports = {
  get: async function (req, res) {
    try {
      const products = await db.getProductsByCategoryId(req.params.categoryId);
      res.render("category", {
        categoryId: req.params.categoryId,
        products: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
