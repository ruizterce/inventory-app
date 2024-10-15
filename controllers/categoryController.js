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

  createGet: (req, res) => {
    res.render("createCategory");
  },

  createPost: async function (req, res) {
    try {
      const { name, desc } = req.body;
      await db.addCategory(name, desc);
      res.redirect("/");
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateGet: async function (req, res) {
    try {
      const category = await db.getCategoryById(req.params.categoryId);
      res.render("updateCategory", {
        category: category,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updatePost: async function (req, res) {
    try {
      const { name, desc } = req.body;
      await db.updateCategory(req.params.categoryId, name, desc);
      res.redirect("/");
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deletePost: async function (req, res) {
    try {
      await db.deleteCategory(req.params.categoryId);
      res.redirect("/");
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
