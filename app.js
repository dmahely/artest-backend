const express = require("express");
var app = express();
const dotenv = require("dotenv");
dotenv.config();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
