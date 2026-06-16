const express = require("express");
const { getAll, getById } = require("../controller/usersController");

const router = express();

router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;
