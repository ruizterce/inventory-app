const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");
const PORT = 3000;
const indexRouter = require("./routes/indexRouter");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}`));
