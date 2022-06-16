const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    token: String,
  },
  { timeStamps: true }
);

module.exports = mongoose.model("users", UserSchema);
