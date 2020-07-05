const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const dataRouter = require("./controllers/data");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const dbRouter = require("./controllers/db");
//const middleware = require("./utils/middleware");
//const logger = require('./utils/logger')
const mongoose = require("mongoose");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/data", dataRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/db", dbRouter);

/* app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) */

module.exports = app;
