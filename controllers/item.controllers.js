const Items = require("../models/itemsSchema");
const User = require("../models/userSchema");
module.exports = {
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
  addUserItems: async (req, res) => {
    const user = await User.findById((_id = req.params.id));
    if (!user) {
      return res.status(400).send({ message: "No User Available" });
    }
    try {
      const item = new Items({
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        itemPrice: req.body.itemPrice,
        itemImage: req.body.itemImage,
        itemInnerImage: req.body.itemInnerImage,
        itemCategory: req.body.itemCategory,
        itemQuantity: req.body.itemQuantity,
        owner: req.body.owner,
      });
      let response = await item.save();
      console.log(response, "owner ID");
      const user = await User.findByIdAndUpdate(
        (_id = req.params.id),
        {
          $push: {
            items: response,
          },
        },
        { new: true }
      );
      console.log(response);
      res.status(200).send({
        success: true,

        response: {
          user,
          item: response,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: true, message: "Error in API" });
    }
  },
  showUserItems: async (req, res) => {
    try {
      const user = await User.findById((_id = req.params.id));
      if (!user) {
        return res.status(400).send({ message: "No User Available" });
      }
      const items = await Items.find({ userId: user._id });
      res.status(200).send({ success: true, items });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: true, message: "Error in API" });
    }
  },
  deleteItemByID: async (req, res) => {
    try {
      console.log(req.params.id);

      // const item = await Items.findByIdAndDelete(req.params.id);
      // console.log(item);
      // if (!item) {
      //   return res.status(400).send({ message: "No Item Available" });
      // }

      if (User.items) {
        console.log(User.items,"aaa");
        
      }

      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: true, message: "Error in API" });
    }
  },
};
