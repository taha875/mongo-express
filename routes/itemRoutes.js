const { Router } = require("express");
const items = require("../controllers/item.controllers");
const user = require("../controllers/user.controllers");
var router = require("express").Router();

router.get("/showItems", items.showAllItems);
router.get("/showItems/:id", items.showItem);
router.delete("/deleteItem/:id", items.deleteItemByID);
router.post("/:id/addUserItems", items.addUserItems);
router.get("/showUserItems/:id", items.showUserItems);

module.exports = router;
