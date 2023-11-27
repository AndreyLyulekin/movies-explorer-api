// IMPORT PACKAGES
const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL || "mongodb://127.0.0.1:27017/bitfilmsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
