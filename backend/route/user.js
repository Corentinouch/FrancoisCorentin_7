const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");
const auth = require("../middleware/auth");

router.get("/",auth,userCtrl.getUser)
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.post("/delete", userCtrl.deleteUser)

module.exports = router;