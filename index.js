const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const cors = require("cors");
const dataRouter = require("./controllers/data");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const dbRouter = require("./controllers/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/data", dataRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/db", dbRouter);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connected"))
  .catch((error) => {
    console.log("DB error", error);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
