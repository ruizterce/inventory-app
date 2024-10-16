const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/productController");

productRouter.get("/new", productController.createGet);
productRouter.post("/create", productController.createPost);
productRouter.get("/:productId/update", productController.updateGet);
productRouter.post("/:productId/update", productController.updatePost);
productRouter.post("/:productId/delete", productController.deletePost);
productRouter.get("/:productId", productController.get);

module.exports = productRouter;
