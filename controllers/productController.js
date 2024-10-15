const db = require("../db/queries");

module.exports = {
  get: async function (req, res) {
    try {
      const product = await db.getProductById(req.params.productId);
      res.render("product", {
        product: product,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
