const { Router } = require("express");
const items = require("../controllers/item.controllers");
const user = require("../controllers/user.controllers");
var router = require("express").Router();


router.post("/showItems", items.showAllItems);
router.post("/showItems/:id", items.showItem);
router.post("/deleteItem/:id", items.deleteItemByID);
router.post("/:id/addUserItems", items.addUserItems)
router.post("/showUserItems/:id", items.showUserItems);

module.exports = router;
