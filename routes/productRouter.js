const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/productController");

productRouter.get("/:productId", productController.get);

module.exports = productRouter;
