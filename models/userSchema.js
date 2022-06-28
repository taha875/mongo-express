const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    token: String,
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Items",
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("users", UserSchema);
