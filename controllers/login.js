const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { request, response } = require("express");

const logging = false;

loginRouter.post("/", async (request, response, next) => {
  try {
    logging && console.log("loginRouter POST");
    const body = request.body;
    logging && console.log("body", body);
    const user = await User.findOne({ username: body.username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      console.log("LOGIN FAILED");
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }
    const userToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userToken, process.env.SECRET);
    logging && console.log("loginRouter LOGIN SUCCESS");
    response
      .status(200)
      .json({ token, username: user.username, savedItems: user.savedItems });
  } catch (error) {
    console.log("loginRouter ERROR", error);
    next(error);
  }
});

module.exports = loginRouter;
