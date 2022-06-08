const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    token: String,
  },
  { timeStamps: true }
);

module.exports = mongoose.model("user", schema);
