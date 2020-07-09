const dbRouter = require("express").Router();
const User = require("../models/user");
/* TODO webToken verification
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
     */
dbRouter
  .route("/")
  .post(async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    if (!user.savedItems.includes(body.id)) {
      user.savedItems.push(body.id);
      console.log("dbRouter POST ", body.id);
      await user.save();
      res.json(body.id);
    } else {
      console.log("DB SAVEITEM ERROR");
    }
  })
  .delete(async (req, res) => {
    console.log("dbRouter DELETE ");
    const body = req.body;
    console.log("DB DELETE body", body);
    const user = await User.findOne({ username: body.username });

    if (user.savedItems.includes(body.id)) {
      const index = user.savedItems.indexOf(body.id);
      user.savedItems.splice(index, 1);

      //TODO check index>-1
      console.log("dbRouter DELETE ", body.username, body.id);
      await user.save();
      res.status(200).json(body.id);
    } else {
      console.log("DB DELETEITEM ERROR");
    }
  });
module.exports = dbRouter;
