const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const categoryRouter = require("./categoryRouter");
const brandRouter = require("./brandRouter");
const productRouter = require("./productRouter");

indexRouter.get("/", indexController.get);
indexRouter.use("/category", categoryRouter);
indexRouter.use("/brand", brandRouter);
indexRouter.use("/product", productRouter);

module.exports = indexRouter;
