module.exports = {
  get: (req, res) => {
    res.render("product", { productId: req.params.productId });
  },
};
