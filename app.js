const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const dataRouter = require("./controllers/data");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const dbRouter = require("./controllers/db");
const mongoose = require("mongoose");
/* TODO ./utils/middleware.js
//const middleware = require("./utils/middleware");
//const logger = require('./utils/logger')
 app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) */

mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connected"))
  .catch((error) => {
    console.log("DB error", error);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
//app.use(express.urlencoded()); <-- deprecated?, included in express.json()
app.use("/api/data", dataRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/db", dbRouter);

module.exports = app;
