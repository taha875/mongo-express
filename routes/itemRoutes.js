const { Router } = require("express");
const items = require("../controllers/item.controllers");
var router = require("express").Router();

// add items
router.post("/addItems", items.addItem);
// show all items
router.post("/showItems", items.showAllItems);
// show item on the basis of id
router.post("/showItems/:id", items.showItem);

module.exports = router;
