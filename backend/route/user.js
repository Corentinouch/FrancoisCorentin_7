const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");

router.get("/:id",userCtrl.getUser)
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)

module.exports = router;