const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");

/* userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      likes: 1,
    });
    response.json(users.map((u) => u.toJSON()));
  } catch (error) {
    next(error);
  }
}); */

userRouter.post("/", async (request, response, next) => {
  console.log("userRouter POST");

  try {
    const body = request.body;
    console.log("body", body);
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
    if (error.message.includes("unique")) {
      console.log("DUPLICATE username");
      response.status(401).send(error.message);
    }
    next(error);
  }
});

module.exports = userRouter;
