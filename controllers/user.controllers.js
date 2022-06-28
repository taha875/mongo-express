const User = require("../models/userSchema");
const Items = require("../models/itemsSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
module.exports = {
  signUp: async (req, res) => {
    try {
      if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "Feilds cannot be left empty" });
      }
      let users = await User.findOne({ email: req.body.email });
      if (users) {
        return res.status(400).send({ error: true, message: "user exists" });
      }
      encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
        profilePicture: req.body.profilePicture,
      });
      let response = await user.save();
      console.log(response);
      const token = await jwtToken(
        response._id,
        response.email,
        response.username,
        response.profilePicture
      );
      res.status(200).send({
        success: true,
        response: {
          email: response.email,
          name: response.username,
          profilePicture: response.profilePicture,
          token: token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        error: true,
        message: "system was not able to create the user",
      });
    }
  },
  signIn: async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: "Feils cannot be left empty" });
      }
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .send({ message: "Please sign up before logging in" });
      }

      const token = await jwtToken(
        user._id,
        user.email,
        user.username,
        user.profilePicture
      );

      res.status(200).send({
        success: true,
        response: {
          token: token,
          email: user.email,
          name: user.username,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: true, message: error });
    }
  },
  showAll: async (req, res) => {
    try {
      const user = await User.find({});
      if (!user) {
        return res.status(400).send({ message: "No Users Available" });
      }
      res.status(200).send({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  showUserItems: async (req, res) => {
    try {
      const user = await User.findById((_id = req.params.id));
      if (!user) {
        return res.status(400).send({ message: "No User Available" });
      }
      console.log(user);
      let Inneruser = user.items;
      Inneruser = await Items.find({ _id: { $in: user.items } });
      
      if (!Inneruser) {
        return res.status(400).send({ message: "No Items Available" });
      }
      res.status(200).send({
        success: true,
        user: Inneruser,
      });

    } catch (error) {
      console.log(error);
    }
  },
};
const jwtToken = async (id, email, username, profilePicture) => {
  const token = jwt.sign(
    {
      _id: id,
      email: email,
      name: username,
      picture: profilePicture,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    process.env.jwtSecret
  );
  return token;
};
