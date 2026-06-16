const express = require("express");
const {
  getAll,
  getById,
  postItem,
  updateById,
  deleteItem,
} = require("../controller/itemController");

const router = express();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", postItem);
router.post("/:id", updateById);
router.delete("/:id", deleteItem);

module.exports = router;
