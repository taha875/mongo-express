const { Router } = require("express");
const user = require("../controllers/user.controllers");
var router = require("express").Router();

router.post("/create", user.signUp);
router.post("/login", user.signIn);
router.post("/users", user.showAll);
router.post("/userItems/:id", user.showUserItems);

module.exports = router;
