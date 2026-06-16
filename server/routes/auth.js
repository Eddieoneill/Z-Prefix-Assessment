const express = require("express");
const { registerUser, login, logout } = require("../controller/authController");
const router = express();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
