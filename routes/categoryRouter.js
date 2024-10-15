const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/new", categoryController.createGet);
categoryRouter.post("/create", categoryController.createPost);
categoryRouter.get("/:categoryId/update", categoryController.updateGet);
categoryRouter.post("/:categoryId/update", categoryController.updatePost);
categoryRouter.post("/:categoryId/delete", categoryController.deletePost);
categoryRouter.get("/:categoryId", categoryController.get);

module.exports = categoryRouter;
