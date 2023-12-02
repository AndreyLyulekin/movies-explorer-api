// IMPORT PACKAGES
const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");

// IMPORT MIDDLEWARES
const limiter = require("./middlewares/limiter");
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

// CONFIG VARIABLES
const { PORT, DB_URL } = process.env;
const API_URL = process.env.NODE_ENV === "development" ? "/" : "/api/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL || "mongodb://127.0.0.1:27017/bitfilmsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DEFENSE MIDDLEWARES
app.use(helmet());
app.use(limiter);
app.use(cors);

// REQUEST LOGGER
app.use(requestLogger);

app.use(`${API_URL}`, require("./routes/index"));

// ERRORS
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT || 3000);
