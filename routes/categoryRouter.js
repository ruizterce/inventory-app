const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/:categoryId", categoryController.get);

module.exports = categoryRouter;
