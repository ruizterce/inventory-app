const db = require("../db/queries");

module.exports = {
  get: async function (req, res) {
    try {
      const products = await db.getProductsByBrandId(req.params.brandId);
      res.render("brand", {
        brandId: req.params.brandId,
        products: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
