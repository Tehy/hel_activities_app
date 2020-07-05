var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  savedItems: { type: Array, id: { type: String } },
  passwordHash: String,
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
