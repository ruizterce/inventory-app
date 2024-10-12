module.exports = {
  get: (req, res) => {
    res.render("category", { categoryId: req.params.categoryId });
  },
};
