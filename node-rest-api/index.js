const express = require("express");
const path = require("path");
//const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { port } = require('../config');

const productRoute = require("./routes/product.routes");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());


// Static directory path
app.use(
  express.static(path.join(__dirname, "dist/application"))
);
//app.get("*", (req, res) => {
//    res.sendFile(
//      path.join(__dirname, "dist/application/index.html")
//    );
//  });
// API root
app.use("/api", productRoute);
// PORT
app.listen(port, () => {
  console.log("Listening on port " + port);
});
// Base Route
app.get("/", (req, res) => {
    res.send("invaild endpoint");
  });
// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});