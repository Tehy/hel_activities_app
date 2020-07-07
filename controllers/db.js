const dbRouter = require("express").Router();
const User = require("../models/user");
const { response } = require("express");

dbRouter
  .route("/")
  .get(async (req, res) => {})
  .post(async (req, res) => {
    const body = req.body;
    //console.log("DB POST req", req);
    //console.log("DB POST req.params", req.params);
    //console.log("DB POST body", body);
    const user = await User.findOne({ username: body.username });
    //console.log("user", user);
    if (!user.savedItems.includes(body.id)) {
      user.savedItems.push(body.id);
      console.log("dbRouter POST ", body.id);
      await user.save();
      res.json(body.id);
    } else {
      console.log("DB SAVEITEM ERROR");
    }

    /* TODO
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
     */
  })
  .delete(async (req, res) => {
    const body = req.body;
    //console.log("DB POST req.params", req.params);
    //console.log("DB DELETE body", body);
    const user = await User.findOne({ username: body.username });
    //console.log("user.savedItems", user.savedItems);

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
