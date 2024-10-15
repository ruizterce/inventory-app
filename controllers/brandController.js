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
  createGet: (req, res) => {
    res.render("createBrand");
  },

  createPost: async function (req, res) {
    try {
      const { name, desc } = req.body;
      await db.addBrand(name, desc);
      res.redirect("/");
    } catch (error) {
      console.error("Error creating brand:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateGet: async function (req, res) {
    try {
      const brand = await db.getBrandById(req.params.brandId);
      res.render("updateBrand", {
        brand: brand,
      });
    } catch (error) {
      console.error("Error fetching brand:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updatePost: async function (req, res) {
    try {
      const { name, desc } = req.body;
      await db.updateBrand(req.params.brandId, name, desc);
      res.redirect("/");
    } catch (error) {
      console.error("Error updating brand:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deletePost: async function (req, res) {
    try {
      await db.deleteBrand(req.params.brandId);
      res.redirect("/");
    } catch (error) {
      console.error("Error deleting brand:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
