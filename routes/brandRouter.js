const { Router } = require("express");
const brandRouter = Router();
const brandController = require("../controllers/brandController");

brandRouter.get("/new", brandController.createGet);
brandRouter.post("/create", brandController.createPost);
brandRouter.get("/:brandId/update", brandController.updateGet);
brandRouter.post("/:brandId/update", brandController.updatePost);
brandRouter.get("/:brandId", brandController.get);

module.exports = brandRouter;
