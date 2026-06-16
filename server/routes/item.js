const express = require("express");
const { getAll, getById } = require("../controller/itemController");

const router = express();

router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;
