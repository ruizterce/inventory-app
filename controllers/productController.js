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

  createGet: async function (req, res) {
    try {
      const categories = await db.getCategories();
      const brands = await db.getBrands();
      res.render("createProduct", { categories: categories, brands: brands });
    } catch {
      console.error("Error fetching categories and brands:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  createPost: async function (req, res) {
    try {
      const { name, desc, price, quantity, categoryId, brandId } = req.body;
      await db.addProduct(name, desc, price, quantity, categoryId, brandId);
      res.redirect("/");
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateGet: async function (req, res) {
    try {
      const product = await db.getProductById(req.params.productId);
      const categories = await db.getCategories();
      const brands = await db.getBrands();
      res.render("updateProduct", {
        product: product,
        categories: categories,
        brands: brands,
      });
    } catch (error) {
      console.error("Error fetching information:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updatePost: async function (req, res) {
    try {
      const { name, desc, price, quantity, categoryId, brandId } = req.body;
      await db.updateProduct(
        req.params.productId,
        name,
        desc,
        price,
        quantity,
        categoryId,
        brandId
      );
      res.redirect("/");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deletePost: async function (req, res) {
    try {
      await db.deleteProduct(req.params.productId);
      res.redirect("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
