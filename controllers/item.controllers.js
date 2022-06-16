const Items = require("../models/itemsSchema");
module.exports = {
  addItem: async (req, res) => {
    try {
      const item = new Items({
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        itemPrice: req.body.itemPrice,
        itemImage: req.body.itemImage,
        itemInnerImage: req.body.itemInnerImage,
        itemCategory: req.body.itemCategory,
        itemQuantity: req.body.itemQuantity,
      });
      let response = await item.save();
      console.log(response);
      res.status(200).send({
        success: true,
        response: {
          itemName: response.itemName,
          itemDescription: response.itemDescription,
          itemPrice: response.itemPrice,
          itemImage: response.itemImage,
          itemInnerImage: response.itemInnerImage,
          itemCategory: response.itemCategory,
          itemQuantity: response.itemQuantity,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: true, message: error });
    }
  },
  showAllItems: async (req, res) => {
    try {
      const items = await Items.find({});
      if (!Items) {
        return res.status(400).send({ message: "No Items Available" });
      } else {
        res.status(200).send({ success: true, items });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: true, message: "Error in API" });
    }
  },
  //   show on basis of ID
  showItem: async (req, res) => {
    try {
      const item = await Items.findById((_id = req.params.id));
      if (!item) {
        return res.status(400).send({ message: "No Item Available" });
      } else {
        res.status(200).send({ success: true, item });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: true, message: "Error in API" });
    }
  },
};
