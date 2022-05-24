const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");

router.get("/:id",userCtrl.getUser)
router.post("/", userCtrl.signup)

module.exports = router;