const { Router } = require("express");
const user = require("../controllers/user.controllers");
var router = require("express").Router();

// create new user
router.post("/create", user.signUp);
// Login user
router.post("/login", user.signIn);
// Show Users
router.post("/users", user.showAll);

module.exports = router;
