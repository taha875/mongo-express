const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  itemName: String,
  itemDescription: String,
  itemPrice: Number,
  itemImage: String,
  itemInnerImage: String,
  itemCategory: String,
  itemQuantity: Number,
});
module.exports = mongoose.model("items", itemsSchema);