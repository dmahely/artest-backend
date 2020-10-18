const express = require("express");
var app = express();
const dotenv = require("dotenv");
dotenv.config();
const getToken = require("./methods/getToken");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/token", async function (req, res) {
  const token = await getToken();
  if (token) res.send(token);
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
