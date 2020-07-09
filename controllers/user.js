const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  console.log("userRouter POST");
  try {
    const body = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      savedItems: [String],
      passwordHash,
    });
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    response.status(401).send(error);
  }
});

module.exports = userRouter;
