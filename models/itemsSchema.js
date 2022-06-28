const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  itemName: String,
  itemDescription: String,
  itemPrice: Number,
  itemImage: String,
  itemInnerImage: [{ image: String }],
  itemCategory: String,
  itemQuantity: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});
module.exports = mongoose.model("items", itemsSchema);
