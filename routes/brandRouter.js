const { Router } = require("express");
const brandRouter = Router();
const brandController = require("../controllers/brandController");

brandRouter.get("/:brandId", brandController.get);

module.exports = brandRouter;
